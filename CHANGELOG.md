# 📝 Changelog - Migrasi ke Hosting Gratis

## ✅ Perubahan yang Telah Dilakukan

### 1. Database Migration: MySQL → PostgreSQL
- ✅ Migrasi dari MySQL ke PostgreSQL (kompatibel dengan Supabase)
- ✅ Update file `backend/database.sql` dengan syntax PostgreSQL
- ✅ Menggunakan `SERIAL` untuk auto-increment (bukan `AUTO_INCREMENT`)
- ✅ Menggunakan `ON CONFLICT` untuk handling duplicate (bukan `ON DUPLICATE KEY UPDATE`)
- ✅ Menambahkan trigger untuk `updated_at` timestamp

### 2. Backend Updates
- ✅ Mengganti `mysql2` dengan `pg` (PostgreSQL driver)
- ✅ Update semua query dari MySQL syntax (`?`) ke PostgreSQL syntax (`$1, $2, $3`)
- ✅ Update `backend/db.js` untuk support PostgreSQL dan Supabase connection string
- ✅ Support untuk `DATABASE_URL` (Supabase) dan individual config (PostgreSQL lokal)
- ✅ Update `INSERT` queries untuk menggunakan `RETURNING id` (PostgreSQL)

### 3. Configuration Files
- ✅ `vercel.json` - Konfigurasi untuk Vercel (frontend)
- ✅ `netlify.toml` - Konfigurasi alternatif untuk Netlify
- ✅ `render.yaml` - Konfigurasi untuk Render (backend)
- ✅ `.gitignore` - Update untuk exclude file sensitif
- ✅ `backend/env.example.txt` - Template environment variables

### 4. Documentation
- ✅ `README.md` - Dokumentasi lengkap dengan setup dan hosting guide
- ✅ `PANDUAN_HOSTING.md` - Panduan step-by-step hosting gratis
- ✅ `QUICK_START.md` - Quick start guide untuk development lokal
- ✅ `.env.example` - Template untuk frontend environment variables

### 5. GitHub Setup
- ✅ `.github/workflows/deploy.yml` - GitHub Actions untuk CI/CD

## 🔄 Yang Perlu Dilakukan Selanjutnya

### 1. Install Dependencies Baru
```bash
cd backend
npm install
```

Ini akan menginstall `pg` (PostgreSQL driver) dan menghapus `mysql2`.

### 2. Setup Database
Pilih salah satu:
- **Supabase** (Recommended - gratis): Ikuti panduan di `PANDUAN_HOSTING.md`
- **PostgreSQL Lokal**: Install PostgreSQL dan import `backend/database.sql`

### 3. Update Environment Variables
- Update `backend/.env` dengan konfigurasi database baru
- Update `.env` di root dengan `VITE_API_URL`

### 4. Test Lokal
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
npm run dev
```

### 5. Push ke GitHub
```bash
git add .
git commit -m "Migrasi ke PostgreSQL untuk hosting gratis"
git push
```

### 6. Deploy ke Hosting Gratis
Ikuti panduan lengkap di `PANDUAN_HOSTING.md`:
1. Setup Supabase (database)
2. Deploy backend ke Render
3. Deploy frontend ke Vercel

## ⚠️ Breaking Changes

### Database
- **MySQL → PostgreSQL**: Semua query sudah diupdate, tapi pastikan database sudah di-migrate
- **Connection**: Gunakan `DATABASE_URL` untuk Supabase atau individual config untuk PostgreSQL lokal

### Environment Variables
- **Backend**: `DB_HOST`, `DB_USER`, dll → Bisa tetap digunakan ATAU gunakan `DATABASE_URL`
- **Frontend**: Tambahkan `VITE_API_URL` di `.env`

## 📦 Dependencies Changes

### Removed
- `mysql2` (diganti dengan `pg`)

### Added
- `pg` (PostgreSQL client untuk Node.js)

## 🎯 Next Steps untuk Production

1. **File Upload**: Saat ini file disimpan di `uploads/` yang akan hilang saat restart di Render free tier
   - **Solusi**: Migrate ke Supabase Storage atau Cloudinary

2. **Security**:
   - Ganti password default user
   - Gunakan JWT_SECRET yang kuat
   - Enable HTTPS (sudah otomatis di Vercel/Render)

3. **Monitoring**:
   - Setup error tracking (Sentry, dll)
   - Setup analytics (Google Analytics, dll)

---

**Semua perubahan sudah siap untuk hosting gratis! 🚀**

