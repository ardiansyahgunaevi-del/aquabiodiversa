# 🔧 Fix Error 404 di Vercel

Error 404 di Vercel berarti route tidak ditemukan. Ikuti langkah berikut:

---

## 🔍 Step 1: Cek Konfigurasi Vercel

### 1.1 Cek Root Directory

**PENTING:** Pastikan Root Directory sudah benar!

1. Buka [vercel.com](https://vercel.com) dan login
2. Klik project **backend** Anda
3. Klik **Settings** > **General**
4. Scroll ke **"Root Directory"**
5. Pastikan value adalah: `backend`
   - Jika kosong atau salah, klik **"Edit"** dan set ke `backend`
6. Klik **"Save"**

### 1.2 Cek Build Settings

1. Masih di **Settings** > **General**
2. Scroll ke **"Build & Development Settings"**
3. Pastikan:
   - **Build Command**: (kosong atau `npm install`)
   - **Output Directory**: (kosong)
   - **Install Command**: `npm install`
4. Klik **"Save"**

### 1.3 Cek vercel.json

Pastikan file `backend/vercel.json` sudah benar:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

---

## 🐛 Step 2: Kemungkinan Penyebab

### 2.1 Root Directory Salah

**Gejala:**
- Vercel tidak menemukan `server.js`
- Build berhasil tapi semua route return 404

**Solusi:**
- Set Root Directory ke `backend` di Vercel Dashboard
- Redeploy backend

### 2.2 File vercel.json Tidak Ditemukan

**Gejala:**
- Vercel tidak menggunakan konfigurasi custom
- Routing tidak bekerja

**Solusi:**
- Pastikan `backend/vercel.json` ada
- Pastikan sudah di-commit dan push ke GitHub
- Redeploy backend

### 2.3 Export Format Salah

**Gejala:**
- Build berhasil tapi route tidak bekerja
- Error di logs tentang export

**Solusi:**
- Pastikan `export default app;` ada di `backend/server.js`
- Pastikan menggunakan ES modules (`"type": "module"` di package.json)

### 2.4 Path yang Dipanggil Salah

**Gejala:**
- Request ke path yang tidak ada
- Frontend memanggil URL yang salah

**Solusi:**
- Cek `VITE_API_URL` di frontend environment variables
- Pastikan URL backend sudah benar
- Pastikan path endpoint sudah benar

---

## 🔧 Step 3: Fix Error

### 3.1 Update Root Directory

1. Buka Vercel Dashboard > Backend Project > Settings > General
2. Scroll ke **"Root Directory"**
3. Set ke: `backend`
4. Klik **"Save"**
5. Redeploy backend:
   - Klik **"Deployments"** tab
   - Klik **"Redeploy"** pada deployment terbaru

### 3.2 Update vercel.json

1. Pastikan `backend/vercel.json` sudah benar (lihat contoh di atas)
2. Commit dan push ke GitHub:
   ```bash
   git add backend/vercel.json
   git commit -m "Fix: Update vercel.json configuration"
   git push origin main
   ```
3. Vercel akan otomatis deploy ulang

### 3.3 Cek Export di server.js

1. Pastikan di akhir file `backend/server.js` ada:
   ```javascript
   export default app;
   ```
2. Pastikan `backend/package.json` ada:
   ```json
   {
     "type": "module"
   }
   ```

### 3.4 Update Environment Variables

1. Buka Vercel Dashboard > Backend Project > Settings > Environment Variables
2. Pastikan sudah ada:
   - `DATABASE_URL` (wajib)
   - `JWT_SECRET` (wajib)
   - `NODE_ENV`: `production` (opsional)
3. Redeploy backend setelah update

---

## ✅ Step 4: Verifikasi Fix

### 4.1 Test Root Path

1. Buka: `https://your-backend.vercel.app/`
2. Seharusnya muncul JSON:
   ```json
   {
     "message": "🌊 AquaBiodiversa API",
     "version": "1.0.0",
     "endpoints": { ... }
   }
   ```

### 4.2 Test Health Check

1. Buka: `https://your-backend.vercel.app/api/health`
2. Seharusnya muncul JSON dengan status "OK"

### 4.3 Test Endpoint Lain

1. Test login: `POST /api/auth/login`
2. Test get biota: `GET /api/biota`
3. Pastikan tidak ada error 404

### 4.4 Test dari Frontend

1. Buka frontend di browser
2. Coba login
3. Cek console browser (F12) untuk error
4. Cek Network tab untuk request yang gagal

---

## 🆘 Masih Error?

Jika masih error setelah semua langkah di atas:

1. **Cek logs di Vercel Dashboard:**
   - Klik **Deployments** > deployment terbaru > **View Function Logs**
   - Cari error atau warning

2. **Cek build logs:**
   - Klik **Deployments** > deployment terbaru
   - Lihat build logs untuk error saat build

3. **Test di local:**
   ```bash
   cd backend
   npm install
   npm start
   ```
   - Buka: `http://localhost:3001/`
   - Pastikan tidak ada error

4. **Cek file structure:**
   - Pastikan `backend/server.js` ada
   - Pastikan `backend/vercel.json` ada
   - Pastikan `backend/package.json` ada

---

## 💡 Tips

- **Selalu cek Root Directory** di Vercel Dashboard (harus `backend`)
- **Pastikan vercel.json** sudah benar dan di-commit
- **Test di local** dulu sebelum deploy
- **Cek build logs** jika build gagal

---

## 📋 Checklist

- [ ] Root Directory di Vercel sudah set ke `backend`
- [ ] File `backend/vercel.json` sudah benar
- [ ] File `backend/server.js` ada dan export default app
- [ ] `backend/package.json` ada `"type": "module"`
- [ ] Environment variables sudah di-setup
- [ ] Test root path di production
- [ ] Test health check di production
- [ ] Test dari frontend

---

## 🎯 Langkah Paling Penting

**1. Cek Root Directory di Vercel Dashboard:**
   - Settings > General > Root Directory = `backend`

**2. Redeploy backend setelah update Root Directory**

**3. Test endpoint:**
   - `https://your-backend.vercel.app/`
   - `https://your-backend.vercel.app/api/health`

---

**Langkah pertama: Cek Root Directory di Vercel Dashboard!** 📊

