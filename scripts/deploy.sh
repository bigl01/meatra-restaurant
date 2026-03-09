#!/bin/bash
# Полный деплой: сборка + push + Vercel
# Использование: ./scripts/deploy.sh

set -e

echo "📦 Установка зависимостей..."
npm install

echo "🔨 Сборка проекта..."
npm run build

echo "📤 Push в GitHub (если есть изменения)..."
if git diff --quiet && git diff --staged --quiet; then
    echo "Нет изменений для коммита"
else
    git add -A
    git status
    read -p "Коммит и push? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git commit -m "Deploy: $(date +%Y-%m-%d)"
        git push origin main
    fi
fi

if command -v vercel &> /dev/null; then
    echo "🚀 Деплой на Vercel..."
    vercel --prod
    echo "✅ Готово!"
else
    echo "💡 Vercel CLI не установлен. Push в GitHub — Vercel задеплоит автоматически."
    echo "   Или установите: npm i -g vercel"
fi
