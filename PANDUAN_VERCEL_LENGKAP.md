# 🚀 Panduan Lengkap Deploy ke Vercel

Panduan step-by-step untuk deploy backend dan frontend ke Vercel dari awal.

## ✅ Prerequisites

- [x] Code sudah di GitHub
- [x] Database Supabase sudah dibuat
- [x] Connection string Supabase sudah didapat

---

## 📋 Step 1: Hapus Project Lama di Vercel (Jika Ada)

1. Buka [vercel.com](https://vercel.com) dan login
2. Di dashboard, cari semua project yang terkait dengan `aquabiodiversa`
3. Untuk setiap project:
   - Klik project
   - Settings (ikon gear) > General
   - Scroll ke bawah, klik **"Delete Project"**
   - Konfirmasi penghapusan
4. **Selesai!** Semua project lama sudah dihapus

---

## 🎯 Step 2: Deploy Backend ke Vercel

### 2.1 Import Project untuk Backend

1. Di Vercel dashboard, klik **"Add New..."** > **"Project"**
2. Pilih repository `aquabiodiversa` dari GitHub
3. Klik **"Import"**

### 2.2 Konfigurasi Backend

**PENTING:** Setup konfigurasi berikut:

1. **Project Name**: `aquabiodiversa-backend` (atau nama lain)
2. **Framework Preset**: Pilih **"Other"** atau **"Node.js"**
3. **Root Directory**: `backend` ⭐ (PENTING! Klik "Edit" dan isi `backend`)
4. **Build Command**: `npm install` (atau biarkan kosong)
5. **Output Directory**: (biarkan kosong untuk backend)
6. **Install Command**: `npm install`

**Catatan:** File `backend/vercel.json` sudah ada, Vercel akan otomatis menggunakan konfigurasi ini.

### 2.3 Setup Environment Variables untuk Backend

1. Scroll ke bagian **"Environment Variables"**
2. Klik **"Add"** untuk setiap variabel berikut:

   **a. DATABASE_URL** ⭐ (PENTING!)
   - **Name**: `DATABASE_URL`
   - **Value**: Connection string dari Supabase
     - Buka Supabase Dashboard
     - Cari **"Connect to your project"** atau **Settings > Database**
     - Pilih: Type **URI**, Source **Primary Database**, Method **Session pooler**
     - Copy connection string
     - **Ganti `[YOUR-PASSWORD]`** dengan password project Supabase Anda
     - Paste ke Value
   - Contoh: `postgresql://postgres.xxxxx:password123@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres`
   - **Environment**: Pilih semua (Production, Preview, Development)

   **b. JWT_SECRET**
   - **Name**: `JWT_SECRET`
   - **Value**: Generate secret key
     - Windows PowerShell:
       ```powershell
       [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
       ```
     - Mac/Linux:
       ```bash
       openssl rand -base64 32
       ```
     - Atau gunakan: [randomkeygen.com](https://randomkeygen.com)
   - **Environment**: Pilih semua

   **c. NODE_ENV**
   - **Name**: `NODE_ENV`
   - **Value**: `production`
   - **Environment**: Pilih semua

3. Setelah semua variabel ditambahkan, pastikan semua sudah tersimpan

### 2.4 Deploy Backend

1. Scroll ke bawah
2. Klik **"Deploy"**
3. Vercel akan build dan deploy (tunggu 3-5 menit)
4. Setelah selesai, Anda akan mendapat URL seperti: `https://aquabiodiversa-backend.vercel.app`
5. **Simpan URL ini!** Akan digunakan untuk frontend

### 2.5 Test Backend

1. Buka URL backend di browser
2. Tambahkan `/api/health` di akhir URL
   - Contoh: `https://aquabiodiversa-backend.vercel.app/api/health`
3. Seharusnya muncul JSON:
   ```json
   {
     "status": "OK",
     "message": "AquaBiodiversa API is running!",
     "database": "Connected",
     "timestamp": "..."
   }
   ```
4. Jika error, cek logs di Vercel dashboard

**Catatan:** Vercel menggunakan serverless, jadi pertama kali diakses mungkin perlu beberapa detik untuk "cold start" (normal).

---

## 🎨 Step 3: Deploy Frontend ke Vercel

### 3.1 Import Project untuk Frontend

1. Di Vercel dashboard, klik **"Add New..."** > **"Project"** lagi
2. Pilih repository `aquabiodiversa` yang sama dari GitHub
3. Klik **"Import"**

### 3.2 Konfigurasi Frontend

**PENTING:** Setup konfigurasi berikut:

1. **Project Name**: `aquabiodiversa` (atau nama lain)
2. **Framework Preset**: `Vite` (Vercel akan auto-detect)
3. **Root Directory**: `./` (root, biarkan default)
4. **Build Command**: `npm run build`
5. **Output Directory**: `build`
6. **Install Command**: `npm install`

### 3.3 Setup Environment Variables untuk Frontend

1. Scroll ke bagian **"Environment Variables"**
2. Klik **"Add"**
3. Tambahkan:
   - **Name**: `VITE_API_URL`
   - **Value**: URL backend dari Step 2.4
     - Contoh: `https://aquabiodiversa-backend.vercel.app`
     - **PENTING:** Langsung masukkan URL, JANGAN gunakan format `@api_url` atau reference secret!
   - **Environment**: Pilih semua (Production, Preview, Development)
4. Klik **"Save"**

**⚠️ PENTING:** 
- Jangan gunakan format `@api_url` atau reference secret
- Langsung masukkan URL backend sebagai value
- Contoh yang benar: `https://aquabiodiversa-backend.vercel.app`
- Contoh yang salah: `@api_url` atau `@secret_name`

### 3.4 Deploy Frontend

1. Scroll ke bawah
2. Klik **"Deploy"**
3. Vercel akan build dan deploy (tunggu 2-3 menit)
4. Setelah selesai, Anda akan mendapat URL seperti: `https://aquabiodiversa.vercel.app`
5. **Selamat!** Aplikasi Anda sudah online! 🎉

---

## ✅ Step 4: Verifikasi & Testing

### 4.1 Test Frontend

1. Buka URL frontend di browser
   - Contoh: `https://aquabiodiversa.vercel.app`
2. Pastikan halaman loading dengan baik
3. Coba login dengan user default:
   - Username: `demo`
   - Password: `demo123`

### 4.2 Test Backend API

1. Buka: `https://aquabiodiversa-backend.vercel.app/api/health`
2. Seharusnya muncul JSON dengan status "OK"

### 4.3 Test Upload Foto

1. Login ke aplikasi
2. Coba upload foto biota baru
3. Pastikan tidak ada error

**Catatan:** Upload file di Vercel serverless akan disimpan di memory sementara. Untuk production, pertimbangkan menggunakan Supabase Storage atau Cloudinary.

---

## 📋 Checklist Lengkap

### Backend di Vercel:
- [ ] Project backend sudah dibuat
- [ ] Root Directory: `backend`
- [ ] Environment Variables:
  - [ ] `DATABASE_URL` (connection string Supabase)
  - [ ] `JWT_SECRET`
  - [ ] `NODE_ENV`: `production`
- [ ] Backend sudah di-deploy
- [ ] Backend bisa diakses: `https://your-backend.vercel.app/api/health`

### Frontend di Vercel:
- [ ] Project frontend sudah dibuat
- [ ] Root Directory: `./` (root)
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `build`
- [ ] Environment Variable:
  - [ ] `VITE_API_URL`: URL backend (contoh: `https://your-backend.vercel.app`)
  - [ ] **JANGAN** gunakan format `@api_url`
- [ ] Frontend sudah di-deploy
- [ ] Frontend bisa diakses

### Testing:
- [ ] Login berhasil
- [ ] Upload foto berhasil
- [ ] Semua fitur bekerja

---

## 🆘 Troubleshooting

### Error: "Environment Variable references Secret which does not exist"

**Solusi:**
1. Buka Vercel Dashboard > Project > Settings > Environment Variables
2. Cari `VITE_API_URL`
3. Edit atau Delete dan buat ulang:
   - **Value**: Langsung masukkan URL backend (contoh: `https://aquabiodiversa-backend.vercel.app`)
   - **JANGAN** gunakan format `@api_url`
4. Save dan redeploy

### Backend tidak bisa connect ke database

**Solusi:**
1. Pastikan `DATABASE_URL` sudah benar
2. Pastikan password sudah diganti di connection string (tidak ada `[YOUR-PASSWORD]`)
3. Cek logs di Vercel dashboard untuk detail error

### Frontend tidak bisa connect ke backend

**Solusi:**
1. Pastikan `VITE_API_URL` sudah benar (URL backend dari Vercel)
2. Pastikan backend sudah running dan bisa diakses
3. Test backend langsung: `https://your-backend.vercel.app/api/health`

### Build error

**Solusi:**
1. Cek build logs di Vercel dashboard
2. Pastikan semua dependencies ada di `package.json`
3. Pastikan `package.json` memiliki script `build`
4. Coba build lokal dulu: `npm run build`

---

## 🎉 Selesai!

Aplikasi Anda sekarang sudah online dan bisa diakses dari mana saja!

**URL Frontend**: `https://your-app.vercel.app`  
**URL Backend**: `https://your-backend.vercel.app`

---

## 📚 Catatan Penting

### Upload File di Production

Vercel serverless tidak support file system persisten. File yang di-upload akan hilang saat function restart.

**Solusi untuk production:**
1. Gunakan **Supabase Storage** (gratis, sudah terintegrasi)
2. Atau **Cloudinary** (gratis tier)
3. Atau **AWS S3** (bayar sesuai penggunaan)

### Environment Variables

- Jangan pernah commit file `.env` ke GitHub
- Environment variables di Vercel aman dan terenkripsi
- Jangan gunakan format `@secret_name` untuk `VITE_API_URL`

### Security

- Ganti password default user di production
- Gunakan JWT_SECRET yang kuat
- HTTPS sudah otomatis di Vercel

---

**Pertanyaan?** Cek logs di Vercel dashboard atau buat issue di GitHub repository!

