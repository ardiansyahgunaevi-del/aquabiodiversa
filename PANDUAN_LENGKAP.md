# 🚀 Panduan Lengkap Deploy AquaBiodiversa

Panduan step-by-step untuk deploy aplikasi AquaBiodiversa ke hosting gratis.

## ✅ Yang Sudah Selesai

- [x] Database di Supabase sudah dibuat
- [x] Code sudah di GitHub

---

## 🚂 Step 1: Deploy Backend ke Railway

### 1.1 Daftar di Railway

1. Buka [railway.app](https://railway.app)
2. Klik **"Start a New Project"**
3. Login dengan GitHub

### 1.2 Deploy dari GitHub

1. Setelah login, klik **"New Project"**
2. Pilih **"Deploy from GitHub repo"**
3. Pilih repository `aquabiodiversa` Anda
4. Klik **"Deploy Now"**

### 1.3 Konfigurasi Backend (Jika Belum di Step 1.2)

Jika sudah set di Step 1.2, skip langkah ini. Jika belum:

1. Klik service yang baru dibuat
2. Klik tab **"Settings"**
3. Scroll ke bagian **"Deploy"**
4. Isi konfigurasi:
   - **Root Directory**: `backend` ⭐
   - **Start Command**: `npm start` ⭐
5. Klik **"Save"**

**Atau gunakan file `railway.toml` yang sudah ada:**
- File `railway.toml` sudah ada di root folder
- Railway akan otomatis menggunakan konfigurasi ini
- **PENTING:** Commit dan push file ini SEBELUM deploy:
  ```bash
  git add railway.toml
  git commit -m "Add Railway config"
  git push
  ```
- Setelah push, Railway akan auto-detect konfigurasi dari `railway.toml`

---

## 🌐 Opsi B: Deploy Backend ke Cyclic.sh (TIDAK Perlu Kartu Kredit) ⭐

**Cyclic.sh adalah alternatif terbaik - benar-benar TIDAK perlu kartu kredit!**

### 1.1 Daftar di Cyclic

1. Buka [cyclic.sh](https://www.cyclic.sh)
2. Klik **"Sign Up"** (gratis)
3. Login dengan GitHub
4. **TIDAK perlu kartu kredit!** ✅

### 1.2 Deploy dari GitHub

1. Setelah login, klik **"Deploy Now"**
2. Pilih **"GitHub"**
3. Pilih repository `aquabiodiversa` Anda
4. Klik **"Deploy"**

### 1.3 Konfigurasi Backend

1. **Root Directory**: `backend`
2. Cyclic akan otomatis detect Node.js
3. Pastikan:
   - **Start Command**: `npm start` (otomatis terdeteksi)
   - **Build Command**: `npm install` (otomatis terdeteksi)

### 1.4 Setup Environment Variables

1. Setelah deploy dimulai, klik **"Environment"** tab
2. Klik **"Add Variable"** untuk setiap variabel berikut:

   **a. DATABASE_URL** ⭐ (PENTING!)
   - Key: `DATABASE_URL`
   - Value: Connection string dari Supabase
   - Cara ambil:
     1. Buka Supabase Dashboard
     2. Cari **"Connect to your project"** atau **Settings > Database**
     3. Pilih:
        - Type: **URI**
        - Source: **Primary Database**
        - Method: **Session pooler**
     4. Copy connection string
     5. **Ganti `[YOUR-PASSWORD]`** dengan password project Supabase Anda
     6. Paste ke Cyclic
   - Contoh: `postgresql://postgres.xxxxx:password123@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres`

   **b. JWT_SECRET**
   - Key: `JWT_SECRET`
   - Value: Generate secret key
   - Cara generate:
     ```bash
     # Windows PowerShell
     [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
     
     # Mac/Linux
     openssl rand -base64 32
     ```
     Atau gunakan: [randomkeygen.com](https://randomkeygen.com)

   **c. NODE_ENV**
   - Key: `NODE_ENV`
   - Value: `production`

   **d. PORT** (Opsional)
   - Key: `PORT`
   - Value: `3001`

3. Setelah semua variabel ditambahkan, pastikan semua sudah tersimpan

### 1.5 Deploy

1. Cyclic akan otomatis deploy setelah environment variables di-setup
2. Tunggu 2-3 menit hingga deploy selesai
3. Setelah selesai, Anda akan mendapat URL seperti: `https://aquabiodiversa-backend.cyclic.app`
4. **Simpan URL ini!** Akan digunakan untuk frontend

**Catatan:** Cyclic menggunakan serverless, jadi pertama kali diakses mungkin perlu beberapa detik untuk "wake up".

### 1.6 Test Backend

1. Buka URL backend di browser
2. Tambahkan `/api/health` di akhir URL
   - Contoh: `https://aquabiodiversa-backend.cyclic.app/api/health`
3. Seharusnya muncul JSON dengan status "OK"
4. Jika pertama kali lambat, tunggu beberapa detik (serverless wake up)

---

## 🚂 Opsi A: Setup Environment Variables (Railway)

1. Klik tab **"Variables"** di service
2. Klik **"New Variable"** untuk setiap variabel berikut:

   **a. DATABASE_URL** ⭐ (PENTING!)
   - Key: `DATABASE_URL`
   - Value: Connection string dari Supabase
   - Cara ambil:
     1. Buka Supabase Dashboard
     2. Cari **"Connect to your project"** atau **Settings > Database**
     3. Pilih:
        - Type: **URI**
        - Source: **Primary Database**
        - Method: **Session pooler**
     4. Copy connection string
     5. **Ganti `[YOUR-PASSWORD]`** dengan password project Supabase Anda
     6. Paste ke Railway
   - Contoh: `postgresql://postgres.xxxxx:password123@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres`

   **b. JWT_SECRET**
   - Key: `JWT_SECRET`
   - Value: Generate secret key
   - Cara generate:
     ```bash
     # Windows PowerShell
     [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
     
     # Mac/Linux
     openssl rand -base64 32
     ```
     Atau gunakan: [randomkeygen.com](https://randomkeygen.com)

   **c. NODE_ENV**
   - Key: `NODE_ENV`
   - Value: `production`

   **d. PORT** (Opsional)
   - Key: `PORT`
   - Value: `3000` (Railway auto-set, tapi bisa override)

3. Setelah semua variabel ditambahkan, pastikan semua sudah tersimpan

### 1.5 Deploy

1. Railway akan otomatis deploy setelah environment variables di-setup
2. Tunggu 3-5 menit hingga deploy selesai
3. Setelah selesai, Anda akan mendapat URL seperti: `https://aquabiodiversa-production.up.railway.app`
4. **Simpan URL ini!** Akan digunakan untuk frontend

### 1.6 Test Backend

1. Buka URL backend di browser
2. Tambahkan `/api/health` di akhir URL
   - Contoh: `https://aquabiodiversa-production.up.railway.app/api/health`
3. Seharusnya muncul JSON:
   ```json
   {
     "status": "OK",
     "message": "AquaBiodiversa API is running!",
     "database": "Connected",
     "timestamp": "..."
   }
   ```
4. Jika error, cek logs di Railway dashboard (tab "Deployments")

---

## 🎨 Step 2: Deploy Frontend (Pilih Vercel atau Netlify)

### Perbandingan Vercel vs Netlify

| Fitur | Vercel | Netlify |
|-------|--------|---------|
| **Kemudahan** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Auto-deploy** | ✅ Ya | ✅ Ya |
| **Build speed** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Free tier** | Unlimited | 100GB bandwidth/bulan |
| **Custom domain** | ✅ Gratis | ✅ Gratis |
| **Rekomendasi** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

**💡 Rekomendasi: Vercel** (lebih cepat dan mudah untuk Vite/React)

---

## 🎨 Opsi A: Deploy Frontend ke Vercel (Recommended)

### 2.1 Daftar di Vercel

1. Buka [vercel.com](https://vercel.com)
2. Klik **"Sign Up"**
3. Login dengan GitHub (paling mudah)

### 2.2 Import Project

1. Setelah login, klik **"Add New..."** > **"Project"**
2. Pilih repository `aquabiodiversa` Anda
3. Klik **"Import"**

### 2.3 Konfigurasi Build

Vercel biasanya auto-detect, tapi pastikan:

- **Framework Preset**: `Vite`
- **Root Directory**: `./` (root)
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

### 2.4 Setup Environment Variables

1. Scroll ke bagian **"Environment Variables"**
2. Klik **"Add"**
3. Tambahkan:
   - **Name**: `VITE_API_URL`
   - **Value**: URL backend dari Railway
     - Contoh: `https://aquabiodiversa-production.up.railway.app`
   - **Environment**: Pilih semua (Production, Preview, Development)
4. Klik **"Save"**

### 2.5 Deploy

1. Scroll ke bawah
2. Klik **"Deploy"**
3. Vercel akan build dan deploy (tunggu 2-3 menit)
4. Setelah selesai, Anda akan mendapat URL seperti: `https://aquabiodiversa.vercel.app`
5. **Selamat!** Aplikasi Anda sudah online! 🎉

---

## 🌐 Opsi B: Deploy Frontend ke Netlify

### 2.1 Daftar di Netlify

1. Buka [netlify.com](https://netlify.com)
2. Klik **"Sign Up"**
3. Login dengan GitHub (paling mudah)

### 2.2 Import Project

1. Setelah login, klik **"Add new site"** > **"Import an existing project"**
2. Pilih **"Deploy with GitHub"**
3. Pilih repository `aquabiodiversa` Anda
4. Klik **"Connect"**

### 2.3 Konfigurasi Build

Netlify akan auto-detect, tapi pastikan:

- **Build command**: `npm run build`
- **Publish directory**: `build`
- **Base directory**: `./` (root)

**Catatan:** File `netlify.toml` sudah ada di root folder, Netlify akan otomatis menggunakan konfigurasi ini.

### 2.4 Setup Environment Variables

1. Klik **"Site settings"** (atau **"Environment variables"**)
2. Klik **"Add a variable"**
3. Tambahkan:
   - **Key**: `VITE_API_URL`
   - **Value**: URL backend dari Railway
     - Contoh: `https://aquabiodiversa-production.up.railway.app`
   - **Scopes**: Pilih semua (Production, Deploy previews, Branch deploys)
4. Klik **"Save"**

### 2.5 Deploy

1. Klik **"Deploy site"**
2. Netlify akan build dan deploy (tunggu 2-3 menit)
3. Setelah selesai, Anda akan mendapat URL seperti: `https://aquabiodiversa.netlify.app`
4. **Selamat!** Aplikasi Anda sudah online! 🎉

---

## ✅ Step 3: Verifikasi & Testing

### 3.1 Test Frontend

1. Buka URL Vercel Anda di browser
2. Pastikan halaman loading dengan baik
3. Coba login dengan user default:
   - Username: `demo`
   - Password: `demo123`

### 3.2 Test Upload Foto

1. Login ke aplikasi
2. Coba upload foto biota baru
3. Pastikan tidak ada error

### 3.3 Test API

1. Buka: `https://your-backend-url.up.railway.app/api/health`
2. Seharusnya muncul JSON dengan status "OK"

---

## 🆘 Troubleshooting

### Backend tidak bisa connect ke database

**Gejala:** Error di logs Railway tentang database connection

**Solusi:**
1. Pastikan `DATABASE_URL` sudah benar
2. Pastikan password di connection string sudah diganti (tidak ada `[YOUR-PASSWORD]`)
3. Cek di Supabase: Settings > Database > Connection string
4. Pastikan format: `postgresql://postgres:PASSWORD@HOST:5432/postgres`

### Frontend tidak bisa connect ke backend

**Gejala:** Error "Failed to fetch" atau "Network error"

**Solusi:**
1. Pastikan `VITE_API_URL` di Vercel sudah benar (URL backend dari Railway)
2. Pastikan backend sudah running (cek di Railway dashboard)
3. Test backend langsung: `https://your-backend.onrender.com/api/health`

### Railway: Error "free plan limit" atau tidak bisa upload repo

**Solusi:**
- Railway free tier memiliki limit untuk jumlah repos/deployments
- **Gunakan Cyclic sebagai alternatif** (tidak perlu kartu kredit, unlimited apps)
- Ikuti **Opsi B: Deploy Backend ke Cyclic** di Step 1

### Cyclic: App lambat saat pertama kali diakses

**Solusi:**
- Cyclic menggunakan serverless (auto-sleep saat tidak digunakan)
- Pertama kali diakses butuh beberapa detik untuk "wake up" (normal)
- Setelah wake up, akan cepat seperti biasa

### Error "you must specify" di Railway

**Solusi:**
1. Buka Railway dashboard > Settings
2. Pastikan:
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`
3. Klik **"Save"**
4. Redeploy

### Cyclic: Build failed atau error

**Solusi:**
1. Pastikan **Root Directory**: `backend`
2. Pastikan `package.json` ada di folder `backend`
3. Cek logs di Cyclic dashboard untuk detail error
4. Pastikan environment variables sudah benar
5. Pastikan `npm start` script ada di `backend/package.json`

### Build error di Vercel/Netlify

**Solusi:**
1. Cek build logs di dashboard (Vercel/Netlify)
2. Pastikan semua dependencies ada di `package.json`
3. Pastikan `package.json` memiliki script `build`
4. Coba build lokal dulu: `npm run build`
5. Untuk Netlify, pastikan file `netlify.toml` sudah ada

---

## 📋 Checklist Lengkap

### Database (Supabase)
- [x] Database project dibuat
- [x] Schema di-import (tabel `users` dan `biota` ada)
- [x] Connection string sudah didapat

### Backend (Railway/Cyclic)
- [ ] Backend di-deploy ke Railway atau Cyclic
- [ ] Konfigurasi sudah benar:
  - Railway: Root Directory `backend`, Start Command `npm start`
  - Cyclic: Root Directory `backend`, Start Command `npm start` (otomatis)
- [ ] Environment variables sudah di-setup:
  - [ ] `DATABASE_URL`
  - [ ] `JWT_SECRET`
  - [ ] `NODE_ENV`
- [ ] Backend bisa diakses (test `/api/health`)

### Frontend (Vercel/Netlify)
- [ ] Frontend di-deploy ke Vercel atau Netlify
- [ ] Environment variable `VITE_API_URL` sudah di-setup
- [ ] Frontend bisa diakses
- [ ] Frontend bisa connect ke backend

### Testing
- [ ] Login berhasil
- [ ] Upload foto berhasil
- [ ] Semua fitur bekerja

---

## 🎉 Selesai!

Aplikasi Anda sekarang sudah online dan bisa diakses dari mana saja!

**URL Frontend**: `https://your-app.vercel.app` (Vercel) atau `https://your-app.netlify.app` (Netlify)  
**URL Backend**: `https://your-backend.up.railway.app` (Railway) atau `https://your-backend.cyclic.app` (Cyclic)

---

## 📚 Catatan Penting

### Upload File di Production

Saat ini backend menyimpan file di folder `uploads/` yang akan **hilang** saat service restart di Railway free tier.

**Solusi untuk production:**
1. Gunakan **Supabase Storage** (gratis, sudah terintegrasi)
2. Atau **Cloudinary** (gratis tier)
3. Atau **AWS S3** (bayar sesuai penggunaan)

Untuk sekarang, file upload akan bekerja, tapi akan hilang saat service restart.

### Environment Variables

Jangan pernah commit file `.env` ke GitHub! File tersebut sudah ada di `.gitignore`.

### Security

- Ganti password default user di production
- Gunakan JWT_SECRET yang kuat
- Aktifkan HTTPS (sudah otomatis di Vercel, Netlify, dan Railway)

---

**Pertanyaan?** Cek logs di dashboard Railway/Vercel atau buat issue di GitHub repository!

