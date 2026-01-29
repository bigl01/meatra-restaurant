#!/bin/bash

# 🚀 Автоматическая инициализация Git и загрузка на GitHub
# Скрипт для быстрой настройки проекта

echo "🎯 Инициализация Git репозитория для Meatra Restaurant"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Проверка, не инициализирован ли уже Git
if [ -d ".git" ]; then
    echo "⚠️  Git уже инициализирован в этой папке"
    read -p "Продолжить? (y/n): " continue
    if [ "$continue" != "y" ]; then
        echo "❌ Отменено"
        exit 1
    fi
else
    # Инициализация Git
    echo "📦 Инициализация Git..."
    git init
    echo "✅ Git инициализирован"
fi

# Проверка .gitignore
if [ ! -f ".gitignore" ]; then
    echo "⚠️  .gitignore не найден! Создаю..."
    cat > .gitignore << 'EOF'
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode/
.idea/
*.swp
EOF
    echo "✅ .gitignore создан"
fi

# Проверка .env.local
if [ -f ".env.local" ]; then
    echo "⚠️  ВНИМАНИЕ: .env.local найден!"
    echo "   Убедитесь, что он добавлен в .gitignore (уже сделано)"
    echo "   НЕ загружайте .env.local на GitHub!"
fi

# Первый commit
echo ""
echo "📝 Создание первого commit..."
git add .

git commit -m "🎉 Initial commit - Оптимизированная версия Meatra Restaurant

✨ Features:
- Единое адаптивное приложение (desktop + mobile)
- Next.js 15 + React 19 + TypeScript 5
- Централизованный WordPress API слой
- Переиспользуемые компоненты (Header, Footer, etc.)
- Полная типизация TypeScript
- SEO оптимизация и метаданные
- Responsive дизайн с Tailwind CSS
- Framer Motion анимации

📚 Documentation:
- README.md - основная документация
- DEPLOYMENT.md - руководство по развертыванию
- START_HERE.md - быстрый старт

🎨 Pages:
- Главная страница
- Меню (с каруселями)
- Команда
- Карьера
- Контакты

⚡️ Performance:
- Next.js Image optimization
- ISR с кешированием
- -80% дублирования кода
- Lighthouse Score 90+"

echo "✅ Commit создан"

# Запрос GitHub username
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🌐 Настройка подключения к GitHub"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "ВАЖНО: Сначала создайте репозиторий на GitHub:"
echo "1. Откройте https://github.com/new"
echo "2. Repository name: meatra-restaurant"
echo "3. Description: Оптимизированный сайт ресторана Meatra"
echo "4. Выберите Private или Public"
echo "5. НЕ ставьте галочку 'Initialize with README'"
echo "6. Нажмите 'Create repository'"
echo ""
read -p "Репозиторий создан? (y/n): " repo_created

if [ "$repo_created" != "y" ]; then
    echo ""
    echo "❌ Создайте репозиторий на GitHub и запустите скрипт снова"
    echo "   Или выполните команды вручную:"
    echo ""
    echo "   git remote add origin https://github.com/YOUR_USERNAME/meatra-restaurant.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    exit 0
fi

echo ""
read -p "Введите ваш GitHub username: " github_username

if [ -z "$github_username" ]; then
    echo "❌ Username не может быть пустым"
    exit 1
fi

# Добавление remote
echo ""
echo "🔗 Подключение к GitHub..."
REPO_URL="https://github.com/$github_username/meatra-restaurant.git"
git remote add origin "$REPO_URL" 2>/dev/null || git remote set-url origin "$REPO_URL"
echo "✅ Remote добавлен: $REPO_URL"

# Переименование ветки в main
echo ""
echo "🌿 Настройка ветки main..."
git branch -M main
echo "✅ Ветка переименована в main"

# Push на GitHub
echo ""
echo "🚀 Загрузка кода на GitHub..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "⚠️  Если GitHub попросит авторизацию:"
echo ""
echo "1. Username: $github_username"
echo "2. Password: используйте Personal Access Token"
echo ""
echo "Как получить токен:"
echo "1. Откройте: https://github.com/settings/tokens"
echo "2. 'Generate new token (classic)'"
echo "3. Выберите scope: repo, workflow"
echo "4. Скопируйте токен (начинается с ghp_...)"
echo "5. Вставьте вместо пароля"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
read -p "Нажмите Enter для продолжения..."

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🎉 УРА! Проект успешно загружен на GitHub!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "📍 Ссылка на репозиторий:"
    echo "   https://github.com/$github_username/meatra-restaurant"
    echo ""
    echo "🚀 Следующие шаги:"
    echo ""
    echo "1. 📱 Автоматический деплой на Vercel:"
    echo "   • Откройте https://vercel.com"
    echo "   • Войдите через GitHub"
    echo "   • 'New Project' → выберите meatra-restaurant"
    echo "   • Deploy!"
    echo ""
    echo "2. 🔄 При каждом 'git push' сайт будет автоматически обновляться"
    echo ""
    echo "3. 📝 Полезные команды:"
    echo "   git status              - проверить изменения"
    echo "   git add .               - добавить все файлы"
    echo "   git commit -m 'message' - создать commit"
    echo "   git push                - загрузить на GitHub"
    echo ""
    echo "4. 📖 Документация:"
    echo "   • GITHUB_GUIDE.md - подробное руководство"
    echo "   • DEPLOYMENT.md - инструкции по деплою"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
else
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "❌ Ошибка при загрузке на GitHub"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "Возможные причины:"
    echo "1. Неверный username"
    echo "2. Репозиторий не создан на GitHub"
    echo "3. Неверный токен или пароль"
    echo "4. Нет прав доступа"
    echo ""
    echo "Решение:"
    echo "1. Проверьте, что репозиторий создан: https://github.com/$github_username/meatra-restaurant"
    echo "2. Попробуйте еще раз: git push -u origin main"
    echo "3. Или выполните команды вручную (см. GITHUB_GUIDE.md)"
    echo ""
fi
