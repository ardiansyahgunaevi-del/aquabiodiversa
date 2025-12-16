# 🔧 Troubleshooting Railway

## ❌ Error: "You must specify a workspaceId to create a project"

Error ini muncul karena Railway memerlukan workspace terlebih dahulu sebelum bisa membuat project.

### ✅ Solusi:

1. **Buat Workspace terlebih dahulu:**
   - Di Railway dashboard, cari tombol **"New Workspace"** atau **"Create Workspace"**
   - Klik tombol tersebut
   - Beri nama workspace (contoh: "My Projects" atau "AquaBiodiversa")
   - Klik **"Create"** atau **"Save"**

2. **Setelah workspace dibuat:**
   - Klik **"New Project"** lagi
   - Pilih workspace yang baru dibuat
   - Baru pilih **"Deploy from GitHub repo"**

3. **Jika tidak ada opsi untuk membuat workspace:**
   - Cek apakah akun sudah terverifikasi
   - Atau gunakan **Cyclic.sh** sebagai alternatif (lebih mudah, tidak perlu workspace)

---

## ❌ Error: "You must specify your workshape"

Error ini muncul karena Railway tidak tahu bagaimana cara menjalankan aplikasi Anda.

## ✅ Solusi

### Solusi 1: Isi Konfigurasi Saat Deploy (Paling Mudah)

1. Saat memilih repository di Railway, **JANGAN langsung klik "Deploy Now"**
2. Scroll ke bawah, cari form konfigurasi
3. Isi:
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`
4. Baru klik **"Deploy Now"**

### Solusi 2: Gunakan File railway.toml

1. **Pastikan file `railway.toml` sudah di-push ke GitHub:**
   ```bash
   git add railway.toml
   git commit -m "Add Railway config"
   git push
   ```

2. **Setelah push, Railway akan auto-detect konfigurasi**

3. Jika masih error, set manual di Settings:
   - Buka service di Railway
   - Settings > Deploy
   - Root Directory: `backend`
   - Start Command: `npm start`
   - Save

### Solusi 3: Set Manual di Settings

1. Buka service yang sudah dibuat di Railway
2. Klik tab **"Settings"**
3. Scroll ke **"Deploy"** section
4. Isi:
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`
5. Klik **"Save"**
6. Klik **"Redeploy"** atau tunggu auto-redeploy

## 📋 Checklist

- [ ] File `railway.toml` sudah ada di root folder
- [ ] File `railway.toml` sudah di-push ke GitHub
- [ ] Root Directory sudah di-set ke `backend`
- [ ] Start Command sudah di-set ke `npm start`
- [ ] `backend/package.json` ada dan memiliki script `start`

## 🆘 Jika Masih Error

1. **Cek logs di Railway dashboard** untuk detail error
2. **Pastikan `backend/package.json` memiliki script `start`:**
   ```json
   {
     "scripts": {
       "start": "node server.js"
     }
   }
   ```
3. **Pastikan file `server.js` ada di folder `backend`**

## 💡 Alternatif: Gunakan Cyclic (Recommended)

Jika Railway masih bermasalah atau error workspace, **langsung gunakan Cyclic.sh**:
- ✅ Tidak perlu kartu kredit
- ✅ Tidak perlu workspace
- ✅ Tidak perlu konfigurasi kompleks
- ✅ Auto-detect Node.js
- ✅ Unlimited apps
- ✅ Lebih mudah dan cepat

**Ikuti Opsi B: Cyclic di `PANDUAN_LENGKAP.md` - ini adalah pilihan terbaik!**

---

**Pertanyaan?** Cek logs di Railway dashboard atau gunakan Cyclic sebagai alternatif!

