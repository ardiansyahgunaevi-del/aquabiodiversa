# 🌊 AquaBiodiversa.com

Platform web untuk dokumentasi dan eksplorasi keanekaragaman hayati perairan Indonesia.

## 🚀 Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express
- **Database**: PostgreSQL (kompatibel dengan Supabase)
- **Styling**: Tailwind CSS + shadcn/ui

## 📋 Prerequisites

- Node.js 18+ dan npm
- PostgreSQL (atau akun Supabase gratis)
- Git

## 🛠️ Setup Lokal

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd aquabiodiversa
```

### 2. Setup Database

#### Opsi A: Menggunakan Supabase (Gratis & Recommended)

1. Daftar di [Supabase](https://supabase.com) (gratis)
2. Buat project baru
3. Buka **SQL Editor** di dashboard Supabase
4. Copy dan paste isi file `backend/database.sql`
5. Jalankan script SQL tersebut
6. Ambil **Connection String** dari Settings > Database
   - Format: `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`

#### Opsi B: Menggunakan PostgreSQL Lokal

1. Install PostgreSQL di komputer Anda
2. Buat database:
```bash
createdb aquabiodiversa
```
3. Import schema:
```bash
psql aquabiodiversa < backend/database.sql
```

### 3. Setup Backend

```bash
cd backend
npm install
cp env.example.txt .env
```

Edit file `.env` dan isi dengan konfigurasi database Anda:

**Untuk Supabase:**
```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres
JWT_SECRET=your-super-secret-jwt-key-here
PORT=3001
```

**Untuk PostgreSQL Lokal:**
```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your-password
DB_NAME=aquabiodiversa
DB_PORT=5432
DB_SSL=false
JWT_SECRET=your-super-secret-jwt-key-here
PORT=3001
```

Jalankan backend:
```bash
npm start
# atau untuk development dengan auto-reload:
npm run dev
```

Backend akan berjalan di `http://localhost:3001`

### 4. Setup Frontend

Buka terminal baru di root folder:

```bash
npm install
```

Buat file `.env` di root folder:
```env
VITE_API_URL=http://localhost:3001
```

Jalankan frontend:
```bash
npm run dev
```

Frontend akan berjalan di `http://localhost:3000`

## 🌐 Hosting Gratis

### Frontend: Vercel (Recommended) atau Netlify

#### **Vercel (Paling Mudah)**

1. **Push ke GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/aquabiodiversa.git
git push -u origin main
```

2. **Deploy ke Vercel:**
   - Kunjungi [vercel.com](https://vercel.com)
   - Login dengan GitHub
   - Klik **"New Project"**
   - Pilih repository Anda
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Environment Variables**:
     - `VITE_API_URL`: URL backend Anda (contoh: `https://aquabiodiversa-backend.onrender.com`)
   - Klik **Deploy**

3. **Setelah deploy, update Environment Variable:**
   - Masuk ke Project Settings > Environment Variables
   - Update `VITE_API_URL` dengan URL backend yang sudah di-deploy

#### **Netlify (Alternatif)**

1. **Push ke GitHub** (sama seperti di atas)

2. **Deploy ke Netlify:**
   - Kunjungi [netlify.com](https://netlify.com)
   - Login dengan GitHub
   - Klik **"Add new site"** > **"Import an existing project"**
   - Pilih repository Anda
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
   - **Environment Variables**:
     - `VITE_API_URL`: URL backend Anda
   - Klik **Deploy site**

### Backend: Render (Recommended) atau Railway

#### **Render (Gratis & Mudah)**

1. **Push backend ke GitHub** (pastikan sudah di-push)

2. **Deploy ke Render:**
   - Kunjungi [render.com](https://render.com)
   - Login dengan GitHub
   - Klik **"New +"** > **"Web Service"**
   - Connect repository GitHub Anda
   - **Name**: `aquabiodiversa-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free

3. **Environment Variables:**
   - Klik **"Environment"** tab
   - Tambahkan variabel:
     - `NODE_ENV`: `production`
     - `PORT`: `10000` (Render menggunakan port ini)
     - `DATABASE_URL`: Connection string dari Supabase
     - `JWT_SECRET`: Secret key yang kuat (generate dengan: `openssl rand -base64 32`)

4. **Setelah deploy:**
   - Render akan memberikan URL seperti: `https://aquabiodiversa-backend.onrender.com`
   - Copy URL ini dan update `VITE_API_URL` di Vercel/Netlify

#### **Railway (Alternatif)**

1. Kunjungi [railway.app](https://railway.app)
2. Login dengan GitHub
3. Klik **"New Project"** > **"Deploy from GitHub repo"**
4. Pilih repository Anda
5. **Add Service** > **GitHub Repo**
6. **Settings**:
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`
7. **Variables**:
   - Tambahkan `DATABASE_URL` dan `JWT_SECRET`
8. Railway akan otomatis deploy dan memberikan URL

### Database: Supabase (Gratis)

1. **Daftar di Supabase:**
   - Kunjungi [supabase.com](https://supabase.com)
   - Klik **"Start your project"** (gratis)
   - Login dengan GitHub/Google

2. **Buat Project:**
   - Klik **"New Project"**
   - Pilih organization
   - **Name**: `aquabiodiversa`
   - **Database Password**: Buat password yang kuat (simpan baik-baik!)
   - **Region**: Pilih yang terdekat (Singapore recommended untuk Indonesia)
   - Klik **"Create new project"**

3. **Setup Database:**
   - Tunggu beberapa menit hingga project siap
   - Buka **SQL Editor** di sidebar kiri
   - Klik **"New query"**
   - Copy seluruh isi file `backend/database.sql`
   - Paste dan klik **"Run"**

4. **Ambil Connection String:**
   - Buka **Settings** > **Database**
   - Scroll ke **"Connection string"**
   - Pilih **"URI"**
   - Copy connection string (format: `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`)
   - Ganti `[PASSWORD]` dengan password yang Anda buat saat membuat project
   - Gunakan connection string ini sebagai `DATABASE_URL` di Render/Railway

## 📝 Catatan Penting

### Upload File (Gambar)

Untuk production, disarankan menggunakan **cloud storage** seperti:
- **Supabase Storage** (gratis, sudah terintegrasi)
- **Cloudinary** (gratis tier)
- **AWS S3** (bayar sesuai penggunaan)

Saat ini backend menyimpan file di folder `uploads/` yang akan hilang saat restart di hosting gratis. Untuk production, perlu diubah ke cloud storage.

### Environment Variables

**Frontend (.env):**
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

**Backend (.env):**
```env
DATABASE_URL=postgresql://postgres:password@host:5432/postgres
JWT_SECRET=your-strong-secret-key-here
PORT=10000
NODE_ENV=production
```

### Default Users

Setelah menjalankan `database.sql`, Anda akan memiliki 3 user default:

- **Username**: `demo` / **Password**: `demo123`
- **Username**: `kurniawan` / **Password**: `kurniawan123`
- **Username**: `Adminaquabio77` / **Password**: `telecomadmin` (Admin)

**⚠️ PENTING**: Ganti password default ini di production!

## 🔧 Troubleshooting

### Backend tidak bisa connect ke database

- Pastikan `DATABASE_URL` sudah benar
- Untuk Supabase, pastikan password sudah diganti di connection string
- Cek apakah database sudah dibuat dan schema sudah di-import

### Frontend tidak bisa connect ke backend

- Pastikan `VITE_API_URL` sudah benar
- Pastikan backend sudah running dan bisa diakses
- Cek CORS settings di backend (sudah dikonfigurasi untuk allow semua origin)

### Build error di Vercel/Netlify

- Pastikan `package.json` memiliki script `build`
- Pastikan semua dependencies sudah terdaftar di `package.json`
- Cek build logs di dashboard Vercel/Netlify

## 📚 Dokumentasi API

### Authentication

- `POST /api/auth/register` - Registrasi user baru
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (butuh token)

### Biota

- `GET /api/biota` - Get semua biota (dengan query params: search, category, location)
- `GET /api/biota/:id` - Get biota by ID
- `POST /api/biota` - Create biota baru (butuh token, dengan upload image)
- `PUT /api/biota/:id` - Update biota (butuh token)
- `DELETE /api/biota/:id` - Delete biota (butuh token)

### Health Check

- `GET /api/health` - Check status API dan database connection

## 🤝 Kontribusi

Silakan buat issue atau pull request jika ada yang ingin ditambahkan atau diperbaiki.

## 📄 License

MIT License

---

**Dibuat dengan ❤️ untuk keanekaragaman hayati perairan Indonesia**
