# 🔧 Fix CORS Error

Error CORS terjadi karena backend tidak mengizinkan request dari frontend. Ikuti langkah berikut:

---

## 🐛 Gejala

**Error di console:**
```
Access to fetch at 'https://backend.vercel.app/api/auth/register' from origin 'https://frontend.vercel.app' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

**Penyebab:**
- Backend tidak mengizinkan origin frontend
- CORS configuration tidak benar
- Preflight request (OPTIONS) tidak di-handle dengan benar

---

## 🔧 Step 1: Update CORS di Backend

Saya sudah memperbaiki konfigurasi CORS di `backend/server.js`:

1. **Allow specific origins**: Frontend Vercel URL sudah ditambahkan
2. **Handle preflight requests**: OPTIONS request sudah di-handle
3. **Allow credentials**: Credentials sudah di-enable
4. **Logging**: Origin yang diblokir akan di-log untuk debugging

### 1.1 Cek Konfigurasi CORS

File `backend/server.js` sudah di-update dengan:
- Allow origin dari `https://aquabiodiversa77.vercel.app`
- Support untuk preview URLs (branch deployments)
- Handle preflight requests dengan benar

### 1.2 Update Allowed Origins (Jika Perlu)

Jika frontend URL berbeda, edit `backend/server.js`:

```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://aquabiodiversa77.vercel.app', // Ganti dengan URL frontend Anda
  /^https:\/\/aquabiodiversa77.*\.vercel\.app$/ // Support preview URLs
];
```

---

## 🔧 Step 2: Deploy Backend

Setelah update CORS configuration:

1. Commit dan push ke GitHub:
   ```bash
   git add backend/server.js
   git commit -m "Fix: Update CORS configuration untuk allow frontend origin"
   git push origin main
   ```
2. Vercel akan otomatis deploy backend
3. Tunggu deployment selesai (2-3 menit)

---

## ✅ Step 3: Verifikasi Fix

### 3.1 Test Register

1. Buka frontend di browser
2. Buka DevTools (F12) > Console
3. Coba register dengan data baru
4. Pastikan tidak ada error CORS

### 3.2 Test Login

1. Coba login dengan:
   - Username: `demo`
   - Password: `demo123`
2. Pastikan tidak ada error CORS

### 3.3 Cek Network Tab

1. Buka DevTools (F12) > Network
2. Coba register atau login
3. Cari request ke backend
4. Cek **Response Headers**:
   - Harus ada: `Access-Control-Allow-Origin: https://aquabiodiversa77.vercel.app`
   - Harus ada: `Access-Control-Allow-Credentials: true`

---

## 🐛 Step 4: Troubleshooting

### 4.1 Masih Error CORS

**Cek:**
1. Apakah backend sudah di-deploy ulang?
2. Apakah frontend URL sudah benar di `allowedOrigins`?
3. Apakah ada typo di URL?

**Solusi:**
1. Pastikan frontend URL di `allowedOrigins` sesuai dengan URL frontend Anda
2. Redeploy backend setelah update
3. Clear browser cache dan hard refresh (Ctrl+Shift+R)

### 4.2 Preflight Request Gagal

**Gejala:** Error pada OPTIONS request

**Solusi:**
- CORS configuration sudah di-update untuk handle OPTIONS request
- Pastikan backend sudah di-deploy ulang

### 4.3 Origin Tidak Terdeteksi

**Gejala:** Origin `null` atau `undefined`

**Solusi:**
- Code sudah handle case ini (allow requests dengan no origin)
- Pastikan request dikirim dari browser (bukan dari server-side)

---

## 📋 Checklist

- [ ] CORS configuration sudah di-update di `backend/server.js`
- [ ] Frontend URL sudah ditambahkan ke `allowedOrigins`
- [ ] Backend sudah di-deploy ulang
- [ ] Test register di frontend
- [ ] Test login di frontend
- [ ] Cek Network tab untuk memastikan CORS headers ada

---

## 💡 Tips

- **Selalu update `allowedOrigins`** jika frontend URL berubah
- **Redeploy backend** setelah update CORS configuration
- **Test di browser** untuk memastikan CORS bekerja
- **Cek Network tab** untuk melihat CORS headers

---

## 🎯 Format Allowed Origins

```javascript
const allowedOrigins = [
  'http://localhost:5173', // Local development
  'https://aquabiodiversa77.vercel.app', // Production frontend
  /^https:\/\/aquabiodiversa77.*\.vercel\.app$/ // Preview URLs (branch deployments)
];
```

---

**Langkah pertama: Pastikan backend sudah di-deploy ulang setelah update CORS!** 🚀

