# 🔧 Fix: VITE_API_URL Tidak Memiliki Protocol (https://)

Masalah: URL yang dipanggil menjadi salah karena `VITE_API_URL` tidak memiliki `https://` di depannya.

---

## 🐛 Gejala

**Di console browser:**
```
🔑 API Base URL: aquabiodiversahh-3gw4bqetu-ardiansyahgunaevi-dels-projects.vercel.app
POST https://aquabiodiversa77.vercel.app/aquabiodiversahh-3gw4bqetu-ardiansyahgunaevi-dels-projects.vercel.app/api/auth/login 404
```

**Masalahnya:**
- `VITE_API_URL` tidak memiliki `https://`
- URL menjadi relatif ke frontend URL
- Request gagal dengan 404

---

## 🔧 Step 1: Update VITE_API_URL di Vercel

### 1.1 Akses Environment Variables

1. Buka [vercel.com](https://vercel.com) dan login
2. Klik project **frontend** Anda
3. Klik **Settings** > **Environment Variables**
4. Cari variable `VITE_API_URL`

### 1.2 Update Value

**PENTING:** Value harus memiliki `https://` di depan!

**Contoh yang BENAR:**
```
https://aquabiodiversahh-3gw4bqetu-ardiansyahgunaevi-dels-projects.vercel.app
```

**Contoh yang SALAH:**
```
aquabiodiversahh-3gw4bqetu-ardiansyahgunaevi-dels-projects.vercel.app
aquabiodiversahh-3gw4bqetu-ardiansyahgunaevi-dels-projects.vercel.app/
http://aquabiodiversahh-3gw4bqetu-ardiansyahgunaevi-dels-projects.vercel.app
```

### 1.3 Edit VITE_API_URL

1. Klik **"Edit"** pada `VITE_API_URL`
2. Pastikan value dimulai dengan `https://`
3. Pastikan tidak ada trailing slash (`/`) di akhir
4. Contoh format:
   ```
   https://your-backend.vercel.app
   ```
5. Klik **"Save"**

---

## 🔧 Step 2: Redeploy Frontend

**PENTING:** Setelah update environment variable, harus redeploy!

1. Klik tab **"Deployments"**
2. Klik **"Redeploy"** pada deployment terbaru
3. Pilih **"Use existing Build Cache"** (opsional)
4. Klik **"Redeploy"**
5. Tunggu deployment selesai (2-3 menit)

---

## ✅ Step 3: Verifikasi Fix

### 3.1 Test di Browser Console

1. Buka frontend di browser
2. Buka DevTools (F12) > Console
3. Ketik:
   ```javascript
   console.log(import.meta.env.VITE_API_URL)
   ```
4. Seharusnya muncul URL dengan `https://` di depan

### 3.2 Test Login

1. Coba login dengan:
   - Username: `demo`
   - Password: `demo123`
2. Buka tab **Network** di DevTools
3. Cari request ke `/api/auth/login`
4. Cek **Request URL**:
   - Harus: `https://your-backend.vercel.app/api/auth/login`
   - Jangan: `https://your-frontend.vercel.app/your-backend.vercel.app/api/auth/login`

### 3.3 Cek Console Logs

Setelah fix, di console harus muncul:
```
🌐 API Request: https://your-backend.vercel.app/api/auth/login
🔑 API Base URL: https://your-backend.vercel.app
📍 Endpoint: /api/auth/login
✅ Full URL: https://your-backend.vercel.app/api/auth/login
```

---

## 🛡️ Step 4: Code Fix (Sudah Diperbaiki)

Saya sudah memperbaiki code untuk handle case ini:

1. **Auto-fix protocol**: Jika `VITE_API_URL` tidak memiliki `https://`, akan otomatis ditambahkan
2. **Validasi URL**: Code akan validate URL sebelum request
3. **Error message**: Error message yang jelas jika URL tidak valid

**Tapi tetap penting untuk setup `VITE_API_URL` dengan benar!**

---

## 📋 Checklist

- [ ] `VITE_API_URL` sudah di-update dengan `https://` di depan
- [ ] Tidak ada trailing slash (`/`) di akhir URL
- [ ] Frontend sudah di-redeploy setelah update
- [ ] Test di browser console: `import.meta.env.VITE_API_URL`
- [ ] Test login di frontend
- [ ] Cek Network tab untuk memastikan URL benar

---

## 💡 Tips

- **Selalu gunakan `https://`** di depan URL backend
- **Jangan ada trailing slash** di akhir URL
- **Redeploy frontend** setelah update environment variable
- **Test di browser console** untuk memastikan URL benar

---

## 🎯 Format yang Benar

```
✅ BENAR:
https://aquabiodiversahh-3gw4bqetu-ardiansyahgunaevi-dels-projects.vercel.app

❌ SALAH:
aquabiodiversahh-3gw4bqetu-ardiansyahgunaevi-dels-projects.vercel.app
aquabiodiversahh-3gw4bqetu-ardiansyahgunaevi-dels-projects.vercel.app/
http://aquabiodiversahh-3gw4bqetu-ardiansyahgunaevi-dels-projects.vercel.app
```

---

**Langkah pertama: Update `VITE_API_URL` dengan menambahkan `https://` di depan!** 📊

