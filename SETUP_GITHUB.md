# 🔧 Setup GitHub Repository

## Masalah: Repository Not Found

Jika Anda mendapat error `repository not found`, itu karena URL remote masih menggunakan placeholder `YOUR_USERNAME`.

## ✅ Solusi

### Opsi 1: Menggunakan Script (Mudah)

1. Jalankan script setup:
```bash
bash setup-github.sh
```

2. Masukkan username GitHub Anda saat diminta
3. Masukkan nama repository (atau tekan Enter untuk default: `aquabiodiversa`)

### Opsi 2: Manual (Langsung)

**Langkah 1: Buat Repository di GitHub**

1. Buka [github.com](https://github.com) dan login
2. Klik tombol **"+"** di kanan atas > **"New repository"**
3. Isi:
   - **Repository name**: `aquabiodiversa` (atau nama lain)
   - **Description**: (opsional)
   - **Visibility**: Public atau Private
   - **JANGAN** centang "Add a README file"
4. Klik **"Create repository"**

**Langkah 2: Update Remote URL**

Ganti `USERNAME_ANDA` dengan username GitHub Anda:

```bash
# Contoh: jika username Anda adalah "john123"
git remote set-url origin https://github.com/john123/aquabiodiversa.git
```

**Langkah 3: Verifikasi**

```bash
git remote -v
```

Seharusnya muncul URL yang benar (bukan `YOUR_USERNAME`).

**Langkah 4: Push ke GitHub**

```bash
git push -u origin main
```

Jika diminta login:
- **Username**: Username GitHub Anda
- **Password**: Gunakan **Personal Access Token** (bukan password GitHub)
  - Cara buat token: GitHub Settings > Developer settings > Personal access tokens > Generate new token
  - Beri permission: `repo` (full control)

## 🔑 Cara Membuat Personal Access Token

1. Buka [github.com/settings/tokens](https://github.com/settings/tokens)
2. Klik **"Generate new token"** > **"Generate new token (classic)"**
3. Isi:
   - **Note**: `aquabiodiversa-push`
   - **Expiration**: Pilih durasi (90 days recommended)
   - **Scopes**: Centang `repo` (full control)
4. Klik **"Generate token"**
5. **Copy token** (hanya muncul sekali!)
6. Gunakan token ini sebagai password saat push

## ✅ Setelah Berhasil

Jika push berhasil, Anda akan melihat:
```
Enumerating objects: X, done.
Counting objects: 100% (X/X), done.
...
To https://github.com/USERNAME/aquabiodiversa.git
 * [new branch]      main -> main
```

Sekarang repository Anda sudah ada di GitHub! 🎉

## 📝 Langkah Selanjutnya

Setelah repository ada di GitHub, lanjutkan ke:
- **PANDUAN_HOSTING.md** - Untuk deploy ke hosting gratis

