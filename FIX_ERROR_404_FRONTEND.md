# 🔧 Fix Error 404 di Frontend - Register Endpoint

Error 404 saat register berarti frontend tidak bisa menemukan backend endpoint. Ikuti langkah berikut:

---

## 🔍 Step 1: Cek Environment Variable di Frontend

### 1.1 Akses Environment Variables

1. Buka [vercel.com](https://vercel.com) dan login
2. Klik project **frontend** Anda (bukan backend!)
3. Klik **Settings** > **Environment Variables**
4. Cari variable `VITE_API_URL`

### 1.2 Cek Value VITE_API_URL

**PENTING:** Value harus URL backend dari Vercel!

**Contoh yang BENAR:**
```
https://aquabiodiversa-backend.vercel.app
```

**Contoh yang SALAH:**
```
http://localhost:3001
@api_url
https://aquabiodiversa77-gnhiovqyi-ardiansyahgunaevi-dels-projects.vercel.app
```

**⚠️ PENTING:**
- Jangan gunakan URL frontend!
- Jangan gunakan format `@api_url` atau reference secret!
- Langsung masukkan URL backend sebagai value!

### 1.3 Update VITE_API_URL

Jika `VITE_API_URL` tidak ada atau salah:

1. Klik **"Add"** atau **"Edit"**
2. **Name**: `VITE_API_URL`
3. **Value**: URL backend dari Vercel
   - Buka project backend di Vercel
   - Copy URL backend (contoh: `https://aquabiodiversa-backend.vercel.app`)
   - Paste sebagai value
4. **Environment**: Pilih semua (Production, Preview, Development)
5. Klik **"Save"**

---

## 🔍 Step 2: Cek URL Backend

### 2.1 Dapatkan URL Backend

1. Buka Vercel Dashboard
2. Klik project **backend** Anda
3. Copy URL dari bagian atas (contoh: `https://aquabiodiversa-backend.vercel.app`)
4. Test URL ini di browser:
   ```
   https://your-backend.vercel.app/api/health
   ```
5. Seharusnya muncul JSON dengan status "OK"

### 2.2 Pastikan Backend Masih Aktif

1. Buka URL backend di browser
2. Test endpoint:
   - `https://your-backend.vercel.app/` - Harus return JSON
   - `https://your-backend.vercel.app/api/health` - Harus return JSON dengan status "OK"

---

## 🔧 Step 3: Fix Environment Variable

### 3.1 Update VITE_API_URL

1. Buka Vercel Dashboard > Frontend Project > Settings > Environment Variables
2. Edit atau tambahkan `VITE_API_URL`
3. **Value**: URL backend dari Vercel (contoh: `https://aquabiodiversa-backend.vercel.app`)
4. **JANGAN** gunakan:
   - URL frontend
   - `http://localhost:3001`
   - Format `@api_url` atau reference secret
5. Save

### 3.2 Redeploy Frontend

**PENTING:** Setelah update environment variable, harus redeploy!

1. Klik tab **"Deployments"**
2. Klik **"Redeploy"** pada deployment terbaru
3. Pilih **"Use existing Build Cache"** (opsional)
4. Klik **"Redeploy"**
5. Tunggu deployment selesai (2-3 menit)

**Catatan:** Environment variables hanya di-load saat build, jadi harus redeploy setelah update!

---

## ✅ Step 4: Verifikasi Fix

### 4.1 Test di Browser Console

1. Buka frontend di browser
2. Buka DevTools (F12)
3. Buka tab **Console**
4. Ketik:
   ```javascript
   console.log(import.meta.env.VITE_API_URL)
   ```
5. Seharusnya muncul URL backend yang benar

### 4.2 Test Register

1. Buka halaman register di frontend
2. Coba register dengan data baru
3. Buka tab **Network** di DevTools
4. Cari request ke `/api/auth/register`
5. Cek **Request URL**:
   - Harus: `https://your-backend.vercel.app/api/auth/register`
   - Jangan: `https://your-frontend.vercel.app/api/auth/register`
   - Jangan: `http://localhost:3001/api/auth/register`

### 4.3 Test Endpoint Lain

1. Coba login
2. Cek Network tab
3. Pastikan semua request ke backend menggunakan URL yang benar

---

## 🐛 Step 5: Troubleshooting

### 5.1 Masih Error 404

**Cek:**
1. Apakah `VITE_API_URL` sudah benar?
2. Apakah sudah redeploy frontend setelah update?
3. Apakah URL backend masih aktif?
4. Apakah path endpoint sudah benar? (`/api/auth/register`)

### 5.2 URL Masih Salah

**Gejala:** Request masih ke URL yang salah

**Solusi:**
1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R atau Cmd+Shift+R)
3. Cek di browser console: `import.meta.env.VITE_API_URL`
4. Pastikan value sudah benar

### 5.3 CORS Error

**Gejala:** Error "CORS policy" di console

**Solusi:**
- CORS sudah dikonfigurasi di backend
- Pastikan URL backend sudah benar
- Pastikan tidak ada typo di URL

---

## 📋 Checklist

- [ ] `VITE_API_URL` sudah di-setup di frontend Vercel
- [ ] Value adalah URL backend (bukan frontend)
- [ ] URL backend masih aktif (test di browser)
- [ ] Frontend sudah di-redeploy setelah update environment variable
- [ ] Test register di frontend
- [ ] Cek Network tab untuk memastikan URL benar

---

## 💡 Tips

- **Selalu redeploy frontend** setelah update environment variables
- **Test URL backend** di browser sebelum setup environment variable
- **Jangan gunakan URL frontend** sebagai `VITE_API_URL`
- **Gunakan URL lengkap** dengan `https://`

---

## 🎯 Langkah Paling Penting

**1. Cek `VITE_API_URL` di Frontend Vercel:**
   - Settings > Environment Variables
   - Value harus URL backend (contoh: `https://aquabiodiversa-backend.vercel.app`)

**2. Redeploy Frontend setelah update environment variable**

**3. Test di browser console:**
   ```javascript
   console.log(import.meta.env.VITE_API_URL)
   ```

---

**Langkah pertama: Cek dan update `VITE_API_URL` di Frontend Vercel Dashboard!** 📊

