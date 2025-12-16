# 🔍 Cara Cek Error 500 di Backend Vercel

Error 500 berarti ada masalah di server. Ikuti langkah berikut untuk menemukan penyebabnya:

---

## 📋 Step 1: Cek Logs di Vercel Dashboard

### 1.1 Akses Logs

1. Buka [vercel.com](https://vercel.com) dan login
2. Klik project **backend** Anda
3. Klik tab **"Deployments"**
4. Klik deployment terbaru (yang paling atas)
5. Klik **"View Function Logs"** atau **"Logs"**

### 1.2 Cari Error

Di logs, cari:
- ❌ Error messages
- ❌ Stack traces
- ❌ Database connection errors
- ❌ Query errors

**Contoh error yang mungkin muncul:**
```
❌ Error koneksi PostgreSQL: connection refused
❌ Database query error: relation "users" does not exist
❌ Error: column "username" does not exist
```

---

## 🔍 Step 2: Test Endpoint Langsung

### 2.1 Test Health Check

Buka di browser:
```
https://your-backend.vercel.app/api/health
```

**Jika berhasil**, akan muncul:
```json
{
  "status": "OK",
  "message": "AquaBiodiversa API is running!",
  "database": "Connected",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "Vercel Serverless"
}
```

**Jika error**, akan muncul:
```json
{
  "status": "ERROR",
  "message": "Health check failed",
  "error": "Error message here",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2.2 Test Endpoint Lain

Coba endpoint lain di browser atau Postman:
- `GET /api/biota` - Lihat daftar biota
- `POST /api/auth/login` - Test login

---

## 🐛 Step 3: Kemungkinan Penyebab Error 500

### 3.1 Database Connection Error

**Gejala:**
- Error: `connection refused` atau `timeout`
- Error: `password authentication failed`
- Health check return `"database": "Disconnected"`

**Solusi:**
1. Buka Vercel Dashboard > Backend Project > Settings > Environment Variables
2. Cek `DATABASE_URL`:
   - Pastikan format benar: `postgresql://postgres:PASSWORD@HOST:5432/postgres`
   - Pastikan password sudah diganti (tidak ada `[YOUR-PASSWORD]`)
   - Pastikan tidak ada spasi di awal/akhir
3. Test connection string di Supabase Dashboard
4. Redeploy backend setelah update environment variable

### 3.2 Database Table Tidak Ada

**Gejala:**
- Error: `relation "users" does not exist`
- Error: `relation "biota" does not exist`

**Solusi:**
1. Buka Supabase Dashboard > SQL Editor
2. Jalankan script `database.sql` yang ada di folder `backend/`
3. Pastikan semua table sudah dibuat:
   - `users`
   - `biota`
4. Redeploy backend

### 3.3 Query Syntax Error

**Gejala:**
- Error: `syntax error at or near`
- Error: `column "xxx" does not exist`

**Solusi:**
1. Cek logs untuk detail error
2. Pastikan semua query sudah menggunakan PostgreSQL syntax
3. Pastikan nama column sesuai dengan database schema

### 3.4 Missing Environment Variables

**Gejala:**
- Error: `JWT_SECRET is not defined`
- Error: `DATABASE_URL is not defined`

**Solusi:**
1. Buka Vercel Dashboard > Backend Project > Settings > Environment Variables
2. Pastikan semua variable sudah di-setup:
   - `DATABASE_URL` (wajib)
   - `JWT_SECRET` (wajib)
   - `NODE_ENV`: `production` (opsional)
3. Redeploy backend setelah update

### 3.5 CORS Error (Bukan 500, tapi bisa terlihat seperti 500)

**Gejala:**
- Error di browser: `CORS policy: No 'Access-Control-Allow-Origin'`
- Request gagal di frontend

**Solusi:**
- CORS sudah dikonfigurasi di backend
- Pastikan frontend menggunakan URL backend yang benar

---

## 🔧 Step 4: Fix Error

### 4.1 Update Environment Variables

1. Buka Vercel Dashboard > Backend Project > Settings > Environment Variables
2. Edit variable yang bermasalah
3. Klik **"Save"**
4. Redeploy backend:
   - Klik **"Deployments"** tab
   - Klik **"Redeploy"** pada deployment terbaru

### 4.2 Update Database Schema

1. Buka Supabase Dashboard > SQL Editor
2. Jalankan query untuk fix schema
3. Redeploy backend

### 4.3 Update Code

1. Fix code di local
2. Test di local: `cd backend && npm start`
3. Commit dan push:
   ```bash
   git add .
   git commit -m "Fix: deskripsi perbaikan"
   git push origin main
   ```
4. Vercel akan otomatis deploy ulang

---

## 📝 Step 5: Verifikasi Fix

### 5.1 Test Health Check

1. Buka: `https://your-backend.vercel.app/api/health`
2. Pastikan status "OK" dan database "Connected"

### 5.2 Test Endpoint

1. Test login: `POST /api/auth/login`
2. Test get biota: `GET /api/biota`
3. Pastikan tidak ada error 500

### 5.3 Test dari Frontend

1. Buka frontend di browser
2. Coba login
3. Cek console browser (F12) untuk error
4. Cek Network tab untuk request yang gagal

---

## 🆘 Masih Error?

Jika masih error setelah semua langkah di atas:

1. **Copy error message lengkap** dari Vercel logs
2. **Screenshot** error di browser/console
3. **Cek**:
   - Apakah database Supabase masih aktif?
   - Apakah connection string masih valid?
   - Apakah ada limit yang tercapai (free tier)?

4. **Cek file troubleshooting:**
   - `TROUBLESHOOTING_500.md`
   - `VERCEL_TROUBLESHOOTING.md`

---

## 💡 Tips

- **Selalu cek logs** di Vercel Dashboard untuk detail error
- **Test health check** dulu sebelum test endpoint lain
- **Pastikan environment variables** sudah benar sebelum deploy
- **Test di local** dulu sebelum push ke GitHub

---

**Langkah pertama: Cek logs di Vercel Dashboard!** 📊

