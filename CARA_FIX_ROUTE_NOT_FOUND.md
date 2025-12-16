# 🔍 Cara Fix "Route Not Found" Error

Error "Route not found" berarti endpoint yang dipanggil tidak ada di backend. Ikuti langkah berikut:

---

## 📋 Step 1: Cek Logs di Vercel

### 1.1 Akses Logs

1. Buka [vercel.com](https://vercel.com) dan login
2. Klik project **backend** Anda
3. Klik tab **"Deployments"**
4. Klik deployment terbaru
5. Klik **"View Function Logs"**

### 1.2 Cari Log "Route not found"

Di logs, cari:
```
❌ Route not found: GET /api/xxx
```

Log akan menunjukkan:
- **Method**: GET, POST, PUT, DELETE
- **Path**: Path yang dipanggil (contoh: `/api/xxx`)

---

## 🔍 Step 2: Cek Endpoint yang Dipanggil

### 2.1 Cek di Browser Console

1. Buka frontend di browser
2. Buka DevTools (F12)
3. Buka tab **Network**
4. Cari request yang error (status 404)
5. Lihat:
   - **Request URL**: URL lengkap yang dipanggil
   - **Method**: GET, POST, dll
   - **Status**: 404

### 2.2 Cek di Code Frontend

Cek file `src/services/api.ts`:
- Pastikan endpoint path sudah benar
- Pastikan method HTTP sudah benar (GET vs POST)

---

## 🐛 Step 3: Kemungkinan Penyebab

### 3.1 Path Salah

**Gejala:**
- Request ke `/api/biota/` (dengan slash di akhir)
- Request ke `/biota` (tanpa `/api`)
- Request ke `/api/v1/biota` (dengan version)

**Solusi:**
- Pastikan path sesuai dengan route di backend
- Route backend: `/api/biota` (tanpa slash di akhir)
- Jangan tambahkan version atau path lain

### 3.2 Method HTTP Salah

**Gejala:**
- Request GET ke endpoint yang butuh POST
- Request POST ke endpoint yang butuh GET

**Solusi:**
- Cek method di `src/services/api.ts`
- Pastikan sesuai dengan route di backend

### 3.3 URL Backend Salah

**Gejala:**
- Request ke URL yang salah
- Request ke localhost di production

**Solusi:**
1. Buka Vercel Dashboard > Frontend Project > Settings > Environment Variables
2. Cek `VITE_API_URL`:
   - Harus URL backend dari Vercel
   - Contoh: `https://aquabiodiversa-backend.vercel.app`
   - Jangan gunakan `http://localhost:3001` di production

### 3.4 CORS Error (Bisa terlihat seperti 404)

**Gejala:**
- Error di browser: `CORS policy`
- Request gagal sebelum sampai backend

**Solusi:**
- CORS sudah dikonfigurasi di backend
- Pastikan frontend menggunakan URL backend yang benar

---

## ✅ Step 4: Daftar Route yang Tersedia

Berikut adalah route yang tersedia di backend:

### Health Check
- `GET /api/health` - Cek status backend dan database

### Authentication
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (butuh token)
- `GET /api/auth/users` - Get semua users (butuh token, admin only)

### Biota
- `GET /api/biota` - Get semua biota
- `GET /api/biota/:id` - Get biota by ID
- `POST /api/biota` - Create biota baru (butuh token)
- `PUT /api/biota/:id` - Update biota (butuh token)
- `DELETE /api/biota/:id` - Delete biota (butuh token)

### Root
- `GET /` - Info API dan daftar endpoint

---

## 🔧 Step 5: Fix Error

### 5.1 Fix Path di Frontend

Jika path salah di frontend:

1. Buka `src/services/api.ts`
2. Cek endpoint yang dipanggil
3. Pastikan sesuai dengan route di backend
4. Contoh yang benar:
   ```typescript
   // ✅ BENAR
   apiRequest('/api/biota')
   apiRequest('/api/auth/login', { method: 'POST' })
   
   // ❌ SALAH
   apiRequest('/biota')  // Kurang /api
   apiRequest('/api/biota/')  // Ada slash di akhir
   apiRequest('/api/v1/biota')  // Ada version
   ```

### 5.2 Fix URL Backend

Jika `VITE_API_URL` salah:

1. Buka Vercel Dashboard > Frontend Project > Settings > Environment Variables
2. Edit `VITE_API_URL`
3. Pastikan value adalah URL backend dari Vercel:
   ```
   https://your-backend.vercel.app
   ```
4. Jangan gunakan:
   - `http://localhost:3001` (untuk production)
   - `@api_url` (format secret)
5. Save dan redeploy frontend

### 5.3 Fix Method HTTP

Jika method salah:

1. Buka `src/services/api.ts`
2. Cek method untuk setiap endpoint
3. Pastikan sesuai dengan route di backend:
   - GET untuk read data
   - POST untuk create data
   - PUT untuk update data
   - DELETE untuk delete data

---

## 📝 Step 6: Test Fix

### 6.1 Test Health Check

1. Buka: `https://your-backend.vercel.app/api/health`
2. Seharusnya muncul JSON dengan status "OK"

### 6.2 Test Endpoint

1. Test login: `POST /api/auth/login`
2. Test get biota: `GET /api/biota`
3. Pastikan tidak ada error 404

### 6.3 Test dari Frontend

1. Buka frontend di browser
2. Coba login
3. Cek console browser (F12) untuk error
4. Cek Network tab untuk request yang gagal

---

## 🆘 Masih Error?

Jika masih error setelah semua langkah di atas:

1. **Copy log lengkap** dari Vercel (termasuk "Route not found")
2. **Screenshot** error di browser console
3. **Cek**:
   - Apakah URL backend sudah benar?
   - Apakah path endpoint sudah benar?
   - Apakah method HTTP sudah benar?

4. **Test endpoint langsung** di browser atau Postman:
   ```
   https://your-backend.vercel.app/api/health
   https://your-backend.vercel.app/api/biota
   ```

---

## 💡 Tips

- **Selalu cek logs** di Vercel Dashboard untuk detail error
- **Test endpoint langsung** di browser sebelum test dari frontend
- **Pastikan URL backend** sudah benar di environment variables
- **Gunakan Network tab** di browser untuk melihat request yang gagal

---

## 📋 Checklist

- [ ] Cek logs di Vercel Dashboard
- [ ] Cek path endpoint di frontend code
- [ ] Cek method HTTP (GET vs POST)
- [ ] Cek `VITE_API_URL` di environment variables
- [ ] Test endpoint langsung di browser
- [ ] Test dari frontend

---

**Langkah pertama: Cek logs di Vercel Dashboard untuk melihat path yang dipanggil!** 📊

