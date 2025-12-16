# 🔧 Fix Error 500 di Root Path (`/`)

Error 500 saat mengakses root path (`/`) biasanya disebabkan oleh masalah di server. Ikuti langkah berikut:

---

## 🔍 Step 1: Cek Logs di Vercel

### 1.1 Akses Logs

1. Buka [vercel.com](https://vercel.com) dan login
2. Klik project **backend** Anda
3. Klik tab **"Deployments"**
4. Klik deployment terbaru
5. Klik **"View Function Logs"**

### 1.2 Cari Error

Di logs, cari:
- ❌ Error messages
- ❌ Stack traces
- ❌ Import errors
- ❌ Database connection errors

**Contoh error yang mungkin muncul:**
```
❌ Error koneksi PostgreSQL: connection refused
❌ Cannot find module 'xxx'
❌ Error: Unexpected token
```

---

## 🐛 Step 2: Kemungkinan Penyebab

### 2.1 Database Connection Error saat Startup

**Gejala:**
- Error saat server startup
- Error di logs tentang database connection

**Solusi:**
- Route `/` tidak menggunakan database, jadi ini seharusnya bukan masalah
- Tapi jika ada error di startup, bisa mempengaruhi semua route

### 2.2 Import/Module Error

**Gejala:**
- Error: `Cannot find module 'xxx'`
- Error: `Unexpected token`

**Solusi:**
1. Pastikan semua dependencies sudah terinstall
2. Cek `backend/package.json`
3. Pastikan `node_modules` sudah ada (jika test di local)

### 2.3 Environment Variables Missing

**Gejala:**
- Error: `DATABASE_URL is not defined`
- Error: `JWT_SECRET is not defined`

**Solusi:**
- Route `/` tidak menggunakan environment variables
- Tapi jika ada error di startup, bisa mempengaruhi semua route

### 2.4 Vercel Configuration Error

**Gejala:**
- Error saat build
- Error saat deploy

**Solusi:**
1. Cek `backend/vercel.json`
2. Pastikan konfigurasi sudah benar
3. Pastikan `server.js` ada di root folder `backend/`

---

## 🔧 Step 3: Fix Error

### 3.1 Cek Environment Variables

1. Buka Vercel Dashboard > Backend Project > Settings > Environment Variables
2. Pastikan sudah ada:
   - `DATABASE_URL` (wajib)
   - `JWT_SECRET` (wajib)
   - `NODE_ENV`: `production` (opsional)
3. Redeploy backend setelah update

### 3.2 Cek Dependencies

1. Pastikan semua dependencies sudah terinstall
2. Cek `backend/package.json`
3. Pastikan tidak ada dependency yang missing

### 3.3 Cek Vercel Configuration

1. Buka Vercel Dashboard > Backend Project > Settings
2. Pastikan:
   - **Root Directory**: `backend`
   - **Build Command**: (kosong atau sesuai kebutuhan)
   - **Output Directory**: (kosong)
3. Pastikan `backend/vercel.json` sudah benar

### 3.4 Test di Local

1. Test di local dulu:
   ```bash
   cd backend
   npm install
   npm start
   ```
2. Buka: `http://localhost:3001/`
3. Pastikan tidak ada error
4. Jika error di local, fix dulu sebelum deploy

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

### 4.3 Test dari Frontend

1. Buka frontend di browser
2. Cek console browser (F12) untuk error
3. Pastikan tidak ada error 500

---

## 🆘 Masih Error?

Jika masih error setelah semua langkah di atas:

1. **Copy error message lengkap** dari Vercel logs
2. **Screenshot** error di browser
3. **Cek**:
   - Apakah database Supabase masih aktif?
   - Apakah connection string masih valid?
   - Apakah ada limit yang tercapai (free tier)?

4. **Test endpoint lain**:
   - `GET /api/health` - Apakah ini juga error?
   - `GET /api/biota` - Apakah ini juga error?

---

## 💡 Tips

- **Selalu cek logs** di Vercel Dashboard untuk detail error
- **Test di local** dulu sebelum deploy
- **Pastikan environment variables** sudah benar
- **Cek dependencies** sudah terinstall

---

## 📋 Checklist

- [ ] Cek logs di Vercel Dashboard
- [ ] Cek environment variables
- [ ] Cek dependencies di package.json
- [ ] Cek Vercel configuration
- [ ] Test di local
- [ ] Test root path di production
- [ ] Test health check

---

**Langkah pertama: Cek logs di Vercel Dashboard untuk melihat error detail!** 📊

