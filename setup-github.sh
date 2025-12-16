#!/bin/bash
# Script untuk setup GitHub remote
# Ganti USERNAME_ANDA dengan username GitHub Anda

echo "📝 Setup GitHub Remote"
echo ""
echo "Masukkan username GitHub Anda:"
read GITHUB_USERNAME

echo ""
echo "Masukkan nama repository (default: aquabiodiversa):"
read REPO_NAME
REPO_NAME=${REPO_NAME:-aquabiodiversa}

echo ""
echo "🔄 Mengganti remote URL..."
git remote set-url origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git

echo ""
echo "✅ Remote URL sudah diupdate!"
echo ""
echo "URL baru: https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
echo ""
echo "Sekarang coba push dengan:"
echo "  git push -u origin main"

