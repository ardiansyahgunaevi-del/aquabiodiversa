# 📖 Panduan Hosting Gratis AquaBiodiversa

Panduan lengkap step-by-step untuk hosting aplikasi AquaBiodiversa secara gratis.

## 🎯 Overview

Kita akan menggunakan:
- **Frontend**: Vercel (gratis, unlimited)
- **Backend**: Render (gratis, 750 jam/bulan)
- **Database**: Supabase (gratis, 500MB storage)

Semua layanan ini **100% gratis** untuk penggunaan personal/small project.

---

## 📋 Step 1: Setup GitHub Repository

### 1.1 Buat Repository di GitHub

1. Buka [github.com](https://github.com) dan login
2. Klik tombol **"+"** di kanan atas > **"New repository"**
3. Isi:
   - **Repository name**: `aquabiodiversa` (atau nama lain)
   - **Description**: "Platform dokumentasi keanekaragaman hayati perairan"
   - **Visibility**: Public atau Private (terserah)
   - **JANGAN** centang "Add a README file" (karena kita sudah punya)
4. Klik **"Create repository"**

### 1.2 Push Code ke GitHub

Buka terminal/command prompt di folder project Anda:

```bash
# Inisialisasi git (jika belum)
git init

# Tambahkan semua file
git add .

# Commit
git commit -m "Initial commit: Setup untuk hosting gratis"

# Tambahkan remote GitHub (ganti YOUR_USERNAME dengan username GitHub Anda)
git remote add origin https://github.com/YOUR_USERNAME/aquabiodiversa.git

# Push ke GitHub
git branch -M main
git push -u origin main
```

Jika diminta login, gunakan GitHub Personal Access Token (bukan password).

---

## 🗄️ Step 2: Setup Database (Supabase)

### 2.1 Daftar di Supabase

1. Buka [supabase.com](https://supabase.com)
2. Klik **"Start your project"**
3. Login dengan GitHub atau Google (lebih mudah)

### 2.2 Buat Project

1. Setelah login, klik **"New Project"**
2. Jika belum punya organization, buat dulu (gratis)
3. Isi form:
   - **Name**: `aquabiodiversa`
   - **Database Password**: Buat password yang kuat (simpan baik-baik!)
   - **Region**: Pilih **Southeast Asia (Singapore)** untuk performa terbaik
   - **Pricing Plan**: Free
4. Klik **"Create new project"**
5. Tunggu 2-3 menit hingga project siap

### 2.3 Import Database Schema

1. Setelah project siap, klik **"SQL Editor"** di sidebar kiri
2. Klik **"New query"**
3. Buka file `backend/database.sql` di project Anda
4. Copy **seluruh isi** file tersebut
5. Paste ke SQL Editor di Supabase
6. Klik tombol **"Run"** (atau tekan Ctrl+Enter)
7. Pastikan muncul pesan sukses

### 2.4 Ambil Connection String

1. Klik **"Settings"** (ikon gear) di sidebar kiri
2. Klik **"Database"**
3. Scroll ke bagian **"Connection string"**
4. Pilih tab **"URI"**
5. Copy connection string yang muncul
   - Format: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`
6. **PENTING**: Ganti `[YOUR-PASSWORD]` dengan password yang Anda buat saat membuat project
   - Contoh: `postgresql://postgres:mypassword123@db.xxxxx.supabase.co:5432/postgres`
7. Simpan connection string ini, akan digunakan di step berikutnya

---

## ⚙️ Step 3: Deploy Backend (Render)

### 3.1 Daftar di Render

1. Buka [render.com](https://render.com)
2. Klik **"Get Started for Free"**
3. Login dengan GitHub (paling mudah)

### 3.2 Buat Web Service

1. Setelah login, klik **"New +"** di kanan atas
2. Pilih **"Web Service"**
3. Klik **"Connect account"** untuk GitHub (jika belum)
4. Pilih repository `aquabiodiversa` Anda
5. Klik **"Connect"**

### 3.3 Konfigurasi Backend

Isi form dengan:

- **Name**: `aquabiodiversa-backend`
- **Environment**: `Node`
- **Region**: Pilih yang terdekat (Singapore recommended)
- **Branch**: `main`
- **Root Directory**: `backend` (penting!)
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: **Free** (pilih yang gratis)

### 3.4 Setup Environment Variables

Scroll ke bagian **"Environment Variables"**, klik **"Add Environment Variable"** dan tambahkan:

1. **NODE_ENV**
   - Value: `production`

2. **PORT**
   - Value: `10000` (Render menggunakan port ini untuk free tier)

3. **DATABASE_URL**
   - Value: Connection string dari Supabase (yang sudah Anda simpan di Step 2.4)
   - Contoh: `postgresql://postgres:mypassword123@db.xxxxx.supabase.co:5432/postgres`

4. **JWT_SECRET**
   - Value: Generate secret key yang kuat
   - Cara generate (di terminal):
     ```bash
     # Windows (PowerShell)
     [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
     
     # Mac/Linux
     openssl rand -base64 32
     ```
   - Atau gunakan online generator: [randomkeygen.com](https://randomkeygen.com)
   - Simpan secret key ini dengan baik!

### 3.5 Deploy

1. Scroll ke bawah
2. Klik **"Create Web Service"**
3. Render akan mulai build dan deploy (tunggu 5-10 menit)
4. Setelah selesai, Anda akan mendapat URL seperti: `https://aquabiodiversa-backend.onrender.com`
5. **Simpan URL ini**, akan digunakan untuk frontend

### 3.6 Test Backend

1. Buka URL backend Anda di browser
2. Tambahkan `/api/health` di akhir URL
   - Contoh: `https://aquabiodiversa-backend.onrender.com/api/health`
3. Seharusnya muncul JSON dengan status "OK"
4. Jika error, cek logs di dashboard Render

---

## 🎨 Step 4: Deploy Frontend (Vercel)

### 4.1 Daftar di Vercel

1. Buka [vercel.com](https://vercel.com)
2. Klik **"Sign Up"**
3. Login dengan GitHub (paling mudah)

### 4.2 Import Project

1. Setelah login, klik **"Add New..."** > **"Project"**
2. Pilih repository `aquabiodiversa` Anda
3. Klik **"Import"**

### 4.3 Konfigurasi Build

Vercel biasanya auto-detect, tapi pastikan:

- **Framework Preset**: `Vite`
- **Root Directory**: `./` (root)
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

### 4.4 Setup Environment Variables

1. Scroll ke bagian **"Environment Variables"**
2. Klik **"Add"**
3. Tambahkan:
   - **Name**: `VITE_API_URL`
   - **Value**: URL backend dari Render
     - Contoh: `https://aquabiodiversa-backend.onrender.com`
   - **Environment**: Pilih semua (Production, Preview, Development)
4. Klik **"Save"**

### 4.5 Deploy

1. Scroll ke bawah
2. Klik **"Deploy"**
3. Vercel akan build dan deploy (tunggu 2-3 menit)
4. Setelah selesai, Anda akan mendapat URL seperti: `https://aquabiodiversa.vercel.app`
5. **Selamat!** Aplikasi Anda sudah online! 🎉

---

## ✅ Step 5: Verifikasi & Testing

### 5.1 Test Frontend

1. Buka URL Vercel Anda di browser
2. Coba akses halaman utama
3. Coba login dengan user default:
   - Username: `demo`
   - Password: `demo123`

### 5.2 Test Backend API

1. Buka: `https://your-backend-url.onrender.com/api/health`
2. Seharusnya muncul JSON dengan status "OK"

### 5.3 Test Upload Foto

1. Login ke aplikasi
2. Coba upload foto biota baru
3. Pastikan tidak ada error

---

## 🔧 Troubleshooting

### Backend tidak bisa connect ke database

**Gejala**: Error di logs Render tentang database connection

**Solusi**:
1. Pastikan `DATABASE_URL` sudah benar
2. Pastikan password di connection string sudah diganti
3. Cek di Supabase: Settings > Database > Connection string
4. Pastikan format: `postgresql://postgres:PASSWORD@HOST:5432/postgres`

### Frontend tidak bisa connect ke backend

**Gejala**: Error "Failed to fetch" atau "Network error"

**Solusi**:
1. Pastikan `VITE_API_URL` di Vercel sudah benar
2. Pastikan backend sudah running (cek di Render dashboard)
3. Cek CORS di backend (seharusnya sudah dikonfigurasi)
4. Test backend langsung: `https://your-backend.onrender.com/api/health`

### Build error di Vercel

**Gejala**: Build failed di Vercel

**Solusi**:
1. Cek build logs di Vercel dashboard
2. Pastikan semua dependencies ada di `package.json`
3. Pastikan `package.json` memiliki script `build`
4. Coba build lokal dulu: `npm run build`

### Render service sleep (Free tier)

**Gejala**: Backend lambat atau timeout saat pertama kali diakses

**Solusi**:
- Render free tier akan "sleep" setelah 15 menit tidak aktif
- Saat pertama kali diakses setelah sleep, butuh waktu 30-60 detik untuk wake up
- Ini normal untuk free tier
- Untuk production, pertimbangkan upgrade ke paid plan

---

## 📝 Catatan Penting

### Upload File di Production

Saat ini backend menyimpan file di folder `uploads/` yang akan **hilang** saat service restart di Render (free tier).

**Solusi untuk production**:
1. Gunakan **Supabase Storage** (gratis, sudah terintegrasi)
2. Atau **Cloudinary** (gratis tier)
3. Atau **AWS S3** (bayar sesuai penggunaan)

Untuk sekarang, file upload akan bekerja, tapi akan hilang saat service restart.

### Environment Variables

Jangan pernah commit file `.env` ke GitHub! File tersebut sudah ada di `.gitignore`.

### Security

- Ganti password default user di production
- Gunakan JWT_SECRET yang kuat
- Aktifkan HTTPS (sudah otomatis di Vercel dan Render)

---

## 🎉 Selesai!

Aplikasi Anda sekarang sudah online dan bisa diakses dari mana saja!

**URL Frontend**: `https://your-app.vercel.app`
**URL Backend**: `https://your-backend.onrender.com`

---

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [GitHub Documentation](https://docs.github.com)

---

**Pertanyaan?** Buat issue di GitHub repository Anda!

