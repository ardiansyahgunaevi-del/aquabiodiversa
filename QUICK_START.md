# ⚡ Quick Start Guide

Panduan cepat untuk menjalankan aplikasi AquaBiodiversa di komputer Anda.

## 🚀 Setup Cepat (5 Menit)

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Setup Database (Pilih salah satu)

#### Opsi A: Supabase (Recommended - Gratis)

1. Daftar di [supabase.com](https://supabase.com) (gratis)
2. Buat project baru
3. Buka SQL Editor, copy-paste isi `backend/database.sql`
4. Ambil Connection String dari Settings > Database
5. Gunakan sebagai `DATABASE_URL` di backend/.env

#### Opsi B: PostgreSQL Lokal

1. Install PostgreSQL
2. Buat database: `createdb aquabiodiversa`
3. Import: `psql aquabiodiversa < backend/database.sql`

### 3. Setup Environment Variables

**Backend** (`backend/.env`):
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/aquabiodiversa
JWT_SECRET=your-secret-key-here
PORT=3001
```

**Frontend** (`.env` di root):
```env
VITE_API_URL=http://localhost:3001
```

### 4. Jalankan Aplikasi

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 5. Akses Aplikasi

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

**Login dengan user default:**
- Username: `demo` / Password: `demo123`
- Username: `Adminaquabio77` / Password: `telecomadmin` (Admin)

---

## 📚 Dokumentasi Lengkap

- **Setup Lokal**: Lihat [README.md](README.md)
- **Panduan Hosting**: Lihat [PANDUAN_HOSTING.md](PANDUAN_HOSTING.md)

---

## ❓ Masalah?

### Backend tidak bisa connect ke database
- Pastikan PostgreSQL/Supabase sudah running
- Cek `DATABASE_URL` di `backend/.env`

### Frontend tidak bisa connect ke backend
- Pastikan backend sudah running di port 3001
- Cek `VITE_API_URL` di `.env`

### Port sudah digunakan
- Ganti `PORT` di `backend/.env`
- Update `VITE_API_URL` di frontend

---

**Selamat coding! 🎉**

