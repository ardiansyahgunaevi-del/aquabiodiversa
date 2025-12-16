# 🔧 Troubleshooting Error 500 di Vercel

## ❌ Error: "Failed to load resource: the server responded with a status of 500"

Error 500 berarti ada masalah di backend. Berikut cara memperbaikinya:

---

## 🔍 Step 1: Cek Logs di Vercel

1. **Buka Vercel Dashboard**
2. **Pilih project backend** Anda
3. **Klik tab "Deployments"**
4. **Klik deployment terbaru**
5. **Klik "View Function Logs"** atau **"Logs"**
6. **Lihat error detail** di logs

Error yang mungkin muncul:
- Database connection error
- Missing environment variables
- Query syntax error
- File system error

---

## ✅ Step 2: Perbaiki Masalah Umum

### Masalah 1: Database Connection Error

**Gejala:** Error di logs tentang "connection refused" atau "ECONNREFUSED"

**Solusi:**
1. Pastikan `DATABASE_URL` sudah di-setup di Environment Variables
2. Pastikan password sudah diganti di connection string (tidak ada `[YOUR-PASSWORD]`)
3. Pastikan connection string format benar:
   ```
   postgresql://postgres.xxxxx:password@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres
   ```
4. Test connection string di Supabase dashboard

### Masalah 2: Missing Environment Variables

**Gejala:** Error tentang "JWT_SECRET is not defined" atau "DATABASE_URL is not defined"

**Solusi:**
1. Buka Vercel Dashboard > Project > Settings > Environment Variables
2. Pastikan semua variabel sudah ada:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `NODE_ENV`
3. Pastikan semua sudah di-save
4. Redeploy setelah menambahkan environment variables

### Masalah 3: Query Syntax Error

**Gejala:** Error tentang "syntax error" atau "column does not exist"

**Solusi:**
- Pastikan semua query sudah menggunakan PostgreSQL syntax (`$1, $2, $3` bukan `?`)
- Code sudah diupdate, pastikan sudah di-push ke GitHub dan di-deploy ulang

### Masalah 4: File Upload Error (Vercel Serverless)

**Gejala:** Error saat upload file

**Solusi:**
- Vercel serverless tidak support file system persisten
- File upload akan error di Vercel
- **Solusi:** Gunakan Supabase Storage atau Cloudinary untuk upload file
- Untuk sekarang, fitur upload file akan error di Vercel

---

## 🔧 Step 3: Perbaikan Cepat

### 1. Cek Environment Variables

```bash
# Pastikan di Vercel Dashboard sudah ada:
- DATABASE_URL: postgresql://...
- JWT_SECRET: (secret key)
- NODE_ENV: production
```

### 2. Test Backend Langsung

Buka di browser:
```
https://your-backend.vercel.app/api/health
```

Seharusnya muncul:
```json
{
  "status": "OK",
  "message": "AquaBiodiversa API is running!",
  "database": "Connected"
}
```

Jika error, cek logs untuk detail.

### 3. Redeploy Backend

1. Di Vercel Dashboard > Project backend
2. Klik **"Deployments"**
3. Klik **"Redeploy"** pada deployment terbaru
4. Tunggu deploy selesai
5. Test lagi

---

## 📋 Checklist Troubleshooting

- [ ] Cek logs di Vercel dashboard untuk detail error
- [ ] Pastikan `DATABASE_URL` sudah benar
- [ ] Pastikan `JWT_SECRET` sudah di-setup
- [ ] Pastikan `NODE_ENV` sudah di-setup
- [ ] Test `/api/health` endpoint
- [ ] Pastikan semua query menggunakan PostgreSQL syntax
- [ ] Redeploy backend setelah perubahan

---

## 🆘 Error Spesifik

### Error: "Cannot find module 'pg'"

**Solusi:**
- Pastikan `backend/package.json` memiliki `pg` di dependencies
- Redeploy backend

### Error: "Database query error"

**Solusi:**
- Cek connection string sudah benar
- Cek Supabase project masih aktif
- Cek password sudah benar

### Error: "File upload failed"

**Solusi:**
- Vercel serverless tidak support file upload ke disk
- Gunakan Supabase Storage atau Cloudinary
- Atau deploy backend ke Render/Fly.io yang support file system

---

## 💡 Tips

1. **Selalu cek logs** di Vercel dashboard untuk detail error
2. **Test endpoint** langsung di browser untuk melihat error message
3. **Redeploy** setelah mengubah environment variables
4. **Pastikan code sudah di-push** ke GitHub sebelum deploy

---

**Masih error?** Kirimkan screenshot logs dari Vercel dashboard untuk bantuan lebih lanjut!

