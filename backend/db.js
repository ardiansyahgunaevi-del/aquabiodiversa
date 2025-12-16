import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Konfigurasi koneksi database PostgreSQL
// Support untuk Supabase dan PostgreSQL lainnya
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'aquabiodiversa',
  port: parseInt(process.env.DB_PORT || '5432'),
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

// Jika menggunakan connection string (untuk Supabase)
if (process.env.DATABASE_URL) {
  dbConfig.connectionString = process.env.DATABASE_URL;
  // Supabase menggunakan SSL
  if (process.env.DATABASE_URL.includes('supabase')) {
    dbConfig.ssl = { rejectUnauthorized: false };
  }
}

// Buat connection pool
const pool = new Pool(dbConfig);

// Test koneksi database
export const testConnection = async () => {
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    console.log('✅ Koneksi PostgreSQL berhasil!');
    return true;
  } catch (error) {
    console.error('❌ Error koneksi PostgreSQL:', error.message);
    console.log('\n📝 Pastikan:');
    console.log('1. PostgreSQL sudah terinstall dan berjalan');
    console.log('2. Database "aquabiodiversa" sudah dibuat');
    console.log('3. File .env sudah dikonfigurasi dengan benar');
    console.log('4. Atau gunakan DATABASE_URL untuk Supabase');
    return false;
  }
};

// Helper function untuk query database
export const query = async (sql, params = []) => {
  try {
    // Convert MySQL syntax ke PostgreSQL jika perlu
    // PostgreSQL menggunakan $1, $2, $3 untuk parameter
    let pgSql = sql;
    if (params.length > 0 && sql.includes('?')) {
      let paramIndex = 1;
      pgSql = sql.replace(/\?/g, () => `$${paramIndex++}`);
    }
    
    const result = await pool.query(pgSql, params);
    return result.rows;
  } catch (error) {
    console.error('❌ Database query error:');
    console.error('SQL:', sql);
    console.error('Params:', params);
    console.error('Error:', {
      message: error.message,
      code: error.code,
      detail: error.detail,
      hint: error.hint,
      position: error.position
    });
    throw error;
  }
};

// Helper function untuk transaction
export const transaction = async (callback) => {
  const client = await pool.connect();
  await client.query('BEGIN');
  
  try {
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export default pool;










