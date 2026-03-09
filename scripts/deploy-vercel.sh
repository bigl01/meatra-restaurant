#!/bin/bash
# Деплой на Vercel
# Использование: ./scripts/deploy-vercel.sh

set -e

echo "🔍 Проверка Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI не установлен. Установите: npm i -g vercel"
    exit 1
fi

echo "📦 Сборка проекта..."
npm run build

echo "🚀 Деплой на Vercel..."
vercel --prod

echo "✅ Деплой завершён!"
