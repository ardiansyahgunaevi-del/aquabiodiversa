# 🔧 Troubleshooting Vercel

## ❌ Error: "Environment Variable references Secret which does not exist"

### Gejala:
```
Environment Variable "VITE_API_URL" references Secret "api_url", which does not exist.
```

### Solusi:

1. **Buka Vercel Dashboard**
2. **Pilih project frontend Anda**
3. **Settings > Environment Variables**
4. **Cari `VITE_API_URL`**
5. **Edit atau Delete dan buat ulang:**
   - **Name**: `VITE_API_URL`
   - **Value**: Langsung masukkan URL backend (bukan reference secret)
   - Contoh: `https://aquabiodiversa-backend.vercel.app`
   - **JANGAN** gunakan format `@api_url` atau `@secret_name`
6. **Save**

### Catatan:
- Vercel Secrets digunakan untuk nilai yang sensitif
- Untuk `VITE_API_URL`, cukup masukkan URL langsung sebagai value
- Tidak perlu membuat secret terlebih dahulu

---

## ⚠️ Warning: Deprecated API

### Gejala:
```
[DEPRECATED] Use `createWithEqualityFn` instead of `create`
```

### Solusi:
- Ini hanya warning dari library `zustand`
- Tidak mempengaruhi fungsi aplikasi
- Bisa diabaikan untuk sekarang
- Akan diperbaiki saat update dependencies

---

## ⚠️ Warning: Resource Preload

### Gejala:
```
The resource was preloaded using link preload but not used within a few seconds
```

### Solusi:
- Ini hanya warning optimisasi
- Tidak mempengaruhi fungsi aplikasi
- Bisa diabaikan

---

## ❌ Error 404: Project Not Found

### Gejala:
```
Failed to load resource: the server responded with a status of 404
/api/v2/projects/aquabiodiversa?teamId=...
```

### Solusi:

1. **Pastikan project sudah di-deploy:**
   - Cek di Vercel dashboard apakah project ada
   - Jika belum, deploy ulang

2. **Cek URL project:**
   - Pastikan menggunakan URL yang benar
   - URL format: `https://project-name.vercel.app`

3. **Cek Environment Variables:**
   - Pastikan `VITE_API_URL` sudah di-setup dengan benar
   - Value harus URL backend yang valid

---

## ✅ Checklist Deploy Vercel

### Backend:
- [ ] Project backend sudah di-deploy ke Vercel
- [ ] Root Directory: `backend`
- [ ] Environment Variables:
  - [ ] `DATABASE_URL` (connection string Supabase)
  - [ ] `JWT_SECRET`
  - [ ] `NODE_ENV`: `production`
- [ ] Backend bisa diakses: `https://your-backend.vercel.app/api/health`

### Frontend:
- [ ] Project frontend sudah di-deploy ke Vercel
- [ ] Root Directory: `./` (root)
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `build`
- [ ] Environment Variable:
  - [ ] `VITE_API_URL`: URL backend (contoh: `https://your-backend.vercel.app`)
  - [ ] **JANGAN** gunakan format `@api_url` atau reference secret
- [ ] Frontend bisa diakses

---

## 🆘 Masih Error?

1. **Cek logs di Vercel dashboard** untuk detail error
2. **Pastikan semua environment variables** sudah di-setup dengan benar
3. **Pastikan URL backend** sudah benar dan bisa diakses
4. **Redeploy** setelah mengubah environment variables

---

**Pertanyaan?** Cek logs di Vercel dashboard atau buat issue di GitHub!

