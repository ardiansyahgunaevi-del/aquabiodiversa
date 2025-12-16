import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import fs from 'fs';
import { testConnection, query } from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'aquabiodiversa-secret-key-2025';

// Middleware CORS - Allow dari localhost dan network
app.use(cors({
  origin: true, // Allow semua origin (localhost dan network)
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Serve static files (uploads) - hanya untuk development
// Di Vercel serverless, file system tidak persisten
if (process.env.VERCEL !== '1') {
  const uploadsDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  app.use('/uploads', express.static(uploadsDir));
}

// Setup multer untuk upload file
// Di Vercel serverless, gunakan memory storage (file tidak bisa disimpan di disk)
const storage = process.env.VERCEL === '1' 
  ? multer.memoryStorage() // Vercel serverless - gunakan memory
  : multer.diskStorage({    // Development - gunakan disk
      destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'biota-' + uniqueSuffix + path.extname(file.originalname));
      }
    });

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Hanya file gambar yang diizinkan!'));
    }
  }
});

// Middleware untuk verifikasi token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token tidak ditemukan. Silakan login terlebih dahulu.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token tidak valid atau sudah kadaluarsa.' });
    }
    req.user = user;
    next();
  });
};

// ==================== ROUTES AUTHENTICATION ====================

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  try {
    let { username, email, password, fullName } = req.body;

    // Normalisasi input
    username = (username || '').trim().toLowerCase();
    email = (email || '').trim().toLowerCase();
    fullName = (fullName || '').trim();

    if (!username || !email || !password || !fullName) {
      return res.status(400).json({ error: 'Semua field harus diisi!' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password minimal 6 karakter!' });
    }

    // Cek apakah username atau email sudah ada
    const existingUsers = await query(
      'SELECT * FROM users WHERE LOWER(username) = $1 OR LOWER(email) = $2',
      [username, email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Username atau email sudah terdaftar!' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user baru
    const result = await query(
      'INSERT INTO users (username, email, password, full_name) VALUES ($1, $2, $3, $4) RETURNING id',
      [username, email, hashedPassword, fullName]
    );

    const userId = result[0].id;

    // Generate token
    const token = jwt.sign(
      { id: userId, username: username, isAdmin: false },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Registrasi berhasil!',
      token,
      user: {
        id: userId,
        username,
        email,
        fullName,
        isAdmin: false
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat registrasi.' });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    let { username, password } = req.body;

    // Normalisasi input (case-insensitive login)
    username = (username || '').trim().toLowerCase();

    if (!username || !password) {
      return res.status(400).json({ error: 'Username dan password harus diisi!' });
    }

    // Cari user di database
    const users = await query('SELECT * FROM users WHERE LOWER(username) = $1', [username]);

    if (users.length === 0) {
      return res.status(401).json({ error: 'Username atau password salah!' });
    }

    const user = users[0];

    // Verifikasi password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Username atau password salah!' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, username: user.username, isAdmin: user.is_admin || false },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login berhasil!',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.full_name,
        isAdmin: user.is_admin || false
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat login.' });
  }
});

// GET /api/auth/me
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const users = await query('SELECT * FROM users WHERE id = $1', [req.user.id]);

    if (users.length === 0) {
      return res.status(404).json({ error: 'User tidak ditemukan.' });
    }

    const user = users[0];

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.full_name,
      isAdmin: user.is_admin || false
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data user.' });
  }
});

// GET /api/auth/users - Get all users (untuk testing/admin, butuh token)
app.get('/api/auth/users', authenticateToken, async (req, res) => {
  try {
    // Cek apakah user adalah admin
    const users = await query('SELECT * FROM users WHERE id = $1', [req.user.id]);
    const currentUser = users[0];

    if (!currentUser || !currentUser.is_admin) {
      return res.status(403).json({ error: 'Hanya admin yang bisa melihat semua users.' });
    }

    // Get all users (tanpa password)
    const allUsers = await query(
      'SELECT id, username, email, full_name, is_admin, created_at FROM users ORDER BY created_at DESC'
    );

    res.json({
      total: allUsers.length,
      users: allUsers
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data users.' });
  }
});

// ==================== ROUTES BIOTA ====================

// GET /api/biota
app.get('/api/biota', async (req, res) => {
  try {
    const { search, category, location } = req.query;
    let sql = 'SELECT * FROM biota WHERE 1=1';
    const params = [];

    let paramIndex = 1;
    if (search) {
      sql += ` AND (name LIKE $${paramIndex} OR description LIKE $${paramIndex + 1} OR location LIKE $${paramIndex + 2})`;
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern, searchPattern);
      paramIndex += 3;
    }

    if (category) {
      sql += ` AND category = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    if (location) {
      sql += ` AND location = $${paramIndex}`;
      params.push(location);
      paramIndex++;
    }

    sql += ' ORDER BY created_at DESC';

    const biota = await query(sql, params);

    res.json(biota);
  } catch (error) {
    console.error('Get biota error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data biota.' });
  }
});

// GET /api/biota/:id
app.get('/api/biota/:id', async (req, res) => {
  try {
    const biota = await query('SELECT * FROM biota WHERE id = $1', [req.params.id]);

    if (biota.length === 0) {
      return res.status(404).json({ error: 'Biota tidak ditemukan.' });
    }

    res.json(biota[0]);
  } catch (error) {
    console.error('Get biota by ID error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data biota.' });
  }
});

// POST /api/biota
app.post('/api/biota', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    console.log('📥 Received upload request');
    console.log('👤 User ID:', req.user?.id);
    console.log('📋 Body:', req.body);
    console.log('📁 File:', req.file ? `${req.file.filename} (${req.file.size} bytes)` : 'Tidak ada file');
    
    const { name, location, category, description } = req.body;

    if (!name || !location) {
      console.log('❌ Validation failed: name or location missing');
      return res.status(400).json({ error: 'Nama dan lokasi harus diisi!' });
    }

    // Get user info
    const users = await query('SELECT * FROM users WHERE id = $1', [req.user.id]);
    if (users.length === 0) {
      console.log('❌ User not found:', req.user.id);
      return res.status(404).json({ error: 'User tidak ditemukan.' });
    }
    const user = users[0];

    // Handle image upload
    let imageUrl = '';
    if (req.file) {
      // Di Vercel serverless, file disimpan di memory, perlu upload ke cloud storage
      if (process.env.VERCEL === '1') {
        // TODO: Upload ke Supabase Storage atau Cloudinary
        // Untuk sekarang, return error yang jelas
        console.log('⚠️ Vercel serverless: File upload perlu disimpan ke cloud storage');
        return res.status(501).json({ 
          error: 'File upload belum didukung di Vercel serverless. Silakan gunakan URL gambar langsung atau deploy backend ke Render/Fly.io untuk support file upload.' 
        });
      } else {
        imageUrl = `/uploads/${req.file.filename}`;
        console.log('✅ File uploaded:', imageUrl);
      }
    } else if (req.body.image) {
      imageUrl = req.body.image;
      console.log('✅ Using body image:', imageUrl);
    } else {
      console.log('❌ No image provided');
      return res.status(400).json({ error: 'Foto biota harus diupload atau berikan URL gambar!' });
    }

    // Insert biota baru
    console.log('💾 Inserting biota to database...');
    const result = await query(
      'INSERT INTO biota (name, location, category, description, image, photographer, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      [
        name,
        location,
        category || 'Ikan Air Tawar',
        description || '',
        imageUrl,
        user.username,
        req.user.id
      ]
    );

    const biotaId = result[0].id;
    console.log('✅ Biota inserted with ID:', biotaId);

    // Get biota yang baru dibuat
    const newBiota = await query('SELECT * FROM biota WHERE id = $1', [biotaId]);

    console.log('✅ Upload successful, returning biota:', newBiota[0]?.id);
    res.status(201).json({
      message: 'Biota berhasil ditambahkan!',
      biota: newBiota[0]
    });
  } catch (error) {
    console.error('❌ Create biota error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Terjadi kesalahan saat menambahkan biota: ' + error.message });
  }
});

// PUT /api/biota/:id
app.put('/api/biota/:id', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const biota = await query('SELECT * FROM biota WHERE id = $1', [req.params.id]);

    if (biota.length === 0) {
      return res.status(404).json({ error: 'Biota tidak ditemukan.' });
    }

    const existingBiota = biota[0];
    const users = await query('SELECT * FROM users WHERE id = $1', [req.user.id]);
    if (users.length === 0) {
      return res.status(404).json({ error: 'User tidak ditemukan.' });
    }
    const user = users[0];

    // Cek apakah user adalah pemilik atau admin
    // Admin bisa edit semua, user biasa hanya bisa edit milik sendiri
    const isOwner = existingBiota.user_id === req.user.id;
    const isAdmin = user.is_admin || false;
    
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: 'Anda tidak memiliki izin untuk mengedit biota ini.' });
    }
    
    console.log(`✅ Edit permission: isOwner=${isOwner}, isAdmin=${isAdmin}, userId=${req.user.id}, biotaUserId=${existingBiota.user_id}`);

    const { name, location, category, description } = req.body;

    // Update fields
    const updateFields = [];
    const updateValues = [];
    let paramIndex = 1;

    if (name) {
      updateFields.push(`name = $${paramIndex}`);
      updateValues.push(name);
      paramIndex++;
    }
    if (location) {
      updateFields.push(`location = $${paramIndex}`);
      updateValues.push(location);
      paramIndex++;
    }
    if (category) {
      updateFields.push(`category = $${paramIndex}`);
      updateValues.push(category);
      paramIndex++;
    }
    if (description !== undefined) {
      updateFields.push(`description = $${paramIndex}`);
      updateValues.push(description);
      paramIndex++;
    }

    // Handle image update
    if (req.file) {
      // Di Vercel serverless, file tidak bisa disimpan di disk
      if (process.env.VERCEL === '1') {
        return res.status(501).json({ 
          error: 'File upload belum didukung di Vercel serverless. Gunakan URL gambar langsung.' 
        });
      }
      // Hapus file lama jika ada (hanya untuk development)
      if (existingBiota.image && existingBiota.image.startsWith('/uploads/')) {
        const oldImagePath = path.join(__dirname, existingBiota.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateFields.push(`image = $${paramIndex}`);
      updateValues.push(`/uploads/${req.file.filename}`);
      paramIndex++;
    } else if (req.body.image) {
      updateFields.push(`image = $${paramIndex}`);
      updateValues.push(req.body.image);
      paramIndex++;
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'Tidak ada data yang diupdate.' });
    }

    updateValues.push(req.params.id);

    await query(
      `UPDATE biota SET ${updateFields.join(', ')} WHERE id = $${paramIndex}`,
      updateValues
    );

    // Get updated biota
    const updatedBiota = await query('SELECT * FROM biota WHERE id = $1', [req.params.id]);

    res.json({
      message: 'Biota berhasil diupdate!',
      biota: updatedBiota[0]
    });
  } catch (error) {
    console.error('Update biota error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengupdate biota.' });
  }
});

// DELETE /api/biota/:id
app.delete('/api/biota/:id', authenticateToken, async (req, res) => {
  try {
    console.log('🗑️ Delete request for biota ID:', req.params.id, 'by user:', req.user.id);
    
    const biota = await query('SELECT * FROM biota WHERE id = $1', [req.params.id]);

    if (biota.length === 0) {
      return res.status(404).json({ error: 'Biota tidak ditemukan.' });
    }

    const existingBiota = biota[0];
    const users = await query('SELECT * FROM users WHERE id = $1', [req.user.id]);
    if (users.length === 0) {
      return res.status(404).json({ error: 'User tidak ditemukan.' });
    }
    const user = users[0];

    // Cek apakah user adalah pemilik atau admin
    // Admin bisa hapus semua, user biasa hanya bisa hapus milik sendiri
    const isOwner = existingBiota.user_id === req.user.id;
    const isAdmin = user.is_admin || false;
    
    if (!isOwner && !isAdmin) {
      console.log('❌ Delete denied: isOwner=', isOwner, 'isAdmin=', isAdmin);
      return res.status(403).json({ error: 'Anda tidak memiliki izin untuk menghapus biota ini.' });
    }
    
    console.log(`✅ Delete permission granted: isOwner=${isOwner}, isAdmin=${isAdmin}`);

    // Hapus file gambar jika ada (hanya untuk development, tidak untuk Vercel serverless)
    if (process.env.VERCEL !== '1' && existingBiota.image && existingBiota.image.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, existingBiota.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await query('DELETE FROM biota WHERE id = $1', [req.params.id]);

    res.json({ message: 'Biota berhasil dihapus!' });
  } catch (error) {
    console.error('Delete biota error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat menghapus biota.' });
  }
});

// ==================== ROOT PATH ====================
app.get('/', (req, res) => {
  res.json({
    message: '🌊 AquaBiodiversa API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me'
      },
      biota: {
        getAll: 'GET /api/biota',
        getById: 'GET /api/biota/:id',
        create: 'POST /api/biota',
        update: 'PUT /api/biota/:id',
        delete: 'DELETE /api/biota/:id'
      }
    },
    documentation: 'Lihat README.md untuk dokumentasi lengkap'
  });
});

// ==================== HEALTH CHECK ====================
app.get('/api/health', async (req, res) => {
  try {
    const dbConnected = await testConnection();
    res.json({ 
      status: dbConnected ? 'OK' : 'ERROR',
      message: 'AquaBiodiversa API is running!',
      database: dbConnected ? 'Connected' : 'Disconnected',
      timestamp: new Date().toISOString(),
      environment: process.env.VERCEL === '1' ? 'Vercel Serverless' : 'Local'
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      status: 'ERROR',
      message: 'Health check failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});


// Export untuk Vercel serverless
export default app;

// Start server hanya jika tidak di Vercel
if (process.env.VERCEL !== '1') {
  const startServer = async () => {
    // Test koneksi database dulu
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.log('\n⚠️  Server tetap akan berjalan, tapi pastikan PostgreSQL sudah dikonfigurasi dengan benar!');
    }

    // Listen on 0.0.0.0 agar bisa diakses dari PC lain di network yang sama
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`\n🚀 Server berjalan di http://localhost:${PORT}`);
      console.log(`🌐 Server bisa diakses dari PC lain di network yang sama`);
      console.log(`📡 API Health Check: http://localhost:${PORT}/api/health`);
      console.log(`🔐 Auth endpoints: /api/auth/login, /api/auth/register`);
      console.log(`🐠 Biota endpoints: /api/biota`);
      console.log(`\n💡 Untuk akses dari PC lain, gunakan IP komputer ini:`);
      console.log(`   Contoh: http://192.168.1.XXX:${PORT}\n`);
    });
  };

  startServer();
}

