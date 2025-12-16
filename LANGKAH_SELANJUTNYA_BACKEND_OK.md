# ✅ Backend Sudah Connected - Langkah Selanjutnya

Backend sudah berhasil di-deploy dan terhubung ke database! 🎉

---

## 🎨 Step 1: Deploy Frontend ke Vercel

### 1.1 Import Project untuk Frontend

1. Buka [vercel.com](https://vercel.com) dan login
2. Klik **"Add New..."** > **"Project"**
3. Pilih repository `aquabiodiversa` yang sama dari GitHub
4. Klik **"Import"**

**Catatan:** Ini adalah project terpisah dari backend (project baru).

### 1.2 Konfigurasi Frontend

**PENTING:** Setup konfigurasi berikut:

1. **Project Name**: `aquabiodiversa` (atau nama lain, berbeda dari backend)
2. **Framework Preset**: `Vite` (Vercel akan auto-detect)
3. **Root Directory**: `./` (root, biarkan default)
4. **Build Command**: `npm run build`
5. **Output Directory**: `build`
6. **Install Command**: `npm install`

### 1.3 Setup Environment Variable

**PENTING:** Ini yang paling penting!

1. Scroll ke bagian **"Environment Variables"**
2. Klik **"Add"**
3. Tambahkan:
   - **Name**: `VITE_API_URL`
   - **Value**: **URL backend dari Vercel** (yang sudah di-deploy tadi)
     - Contoh: `https://aquabiodiversa-backend.vercel.app`
     - **PENTING:** Langsung masukkan URL, JANGAN gunakan format `@api_url` atau reference secret!
   - **Environment**: Pilih semua (Production, Preview, Development)
4. Klik **"Save"**

**⚠️ PENTING:** 
- Jangan gunakan format `@api_url` atau reference secret
- Langsung masukkan URL backend sebagai value
- Contoh yang benar: `https://aquabiodiversa-backend.vercel.app`
- Contoh yang salah: `@api_url` atau `@secret_name`

### 1.4 Deploy Frontend

1. Scroll ke bawah
2. Klik **"Deploy"**
3. Vercel akan build dan deploy (tunggu 2-3 menit)
4. Setelah selesai, Anda akan mendapat URL seperti: `https://aquabiodiversa.vercel.app`
5. **Selamat!** Aplikasi Anda sudah online! 🎉

---

## ✅ Step 2: Verifikasi & Testing

### 2.1 Test Frontend

1. Buka URL frontend di browser
   - Contoh: `https://aquabiodiversa.vercel.app`
2. Pastikan halaman loading dengan baik
3. Cek console browser (F12) untuk error

### 2.2 Test Login

1. Coba login dengan user default:
   - Username: `demo`
   - Password: `demo123`
2. Pastikan login berhasil
3. Pastikan bisa akses halaman setelah login

### 2.3 Test API Connection

1. Buka Network tab di browser DevTools (F12)
2. Coba akses fitur yang memanggil API
3. Pastikan request ke backend berhasil (status 200)
4. Pastikan tidak ada error 500 atau CORS error

### 2.4 Test Upload Foto (Opsional)

**Catatan:** Upload file tidak akan bekerja di Vercel serverless. Akan muncul error 501.

**Solusi untuk production:**
- Gunakan Supabase Storage atau Cloudinary
- Atau deploy backend ke Render/Fly.io yang support file system

---

## 📋 Checklist

### Backend ✅
- [x] Backend sudah di-deploy ke Vercel
- [x] Backend sudah connected ke database
- [x] Backend bisa diakses: `https://your-backend.vercel.app/api/health`

### Frontend
- [ ] Frontend sudah di-deploy ke Vercel
- [ ] Environment Variable `VITE_API_URL` sudah di-setup
- [ ] Frontend bisa diakses
- [ ] Frontend bisa connect ke backend
- [ ] Login berhasil
- [ ] Semua fitur bekerja (kecuali upload file)

---

## 🆘 Troubleshooting

### Frontend tidak bisa connect ke backend

**Gejala:** Error "Failed to fetch" atau "Network error" di console

**Solusi:**
1. Pastikan `VITE_API_URL` sudah benar (URL backend dari Vercel)
2. Pastikan backend masih running (test: `https://your-backend.vercel.app/api/health`)
3. Pastikan tidak ada CORS error (seharusnya sudah dikonfigurasi)
4. Cek Network tab di browser untuk detail error

### Error 500 di frontend

**Solusi:**
1. Cek apakah error dari backend atau frontend
2. Buka Network tab, lihat request yang error
3. Cek logs di Vercel dashboard (backend project)
4. Pastikan environment variables backend sudah benar

### Error "Environment Variable references Secret"

**Solusi:**
1. Buka Vercel Dashboard > Frontend Project > Settings > Environment Variables
2. Edit `VITE_API_URL`
3. Pastikan Value adalah URL langsung (bukan `@api_url`)
4. Save dan redeploy

---

## 🎉 Selesai!

Setelah frontend di-deploy, aplikasi Anda sudah lengkap dan online!

**URL Frontend**: `https://your-app.vercel.app`  
**URL Backend**: `https://your-backend.vercel.app`

---

**Lanjutkan ke Step 1: Deploy Frontend!** 🚀

