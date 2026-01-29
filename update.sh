#!/bin/bash

# 🚀 Скрипт автоматического обновления и загрузки на GitHub
# Используйте: ./update.sh "Описание изменений"

set -e

echo "🔄 Автоматическое обновление проекта Meatra Restaurant"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Проверка наличия изменений
if [[ -z $(git status -s) ]]; then
    echo "✅ Нет изменений для загрузки"
    exit 0
fi

# Получаем сообщение коммита
if [ -z "$1" ]; then
    echo "📝 Описание изменений не указано"
    echo "   Используйте: ./update.sh \"Описание изменений\""
    echo ""
    read -p "Введите описание изменений: " commit_message
    
    if [ -z "$commit_message" ]; then
        commit_message="🔄 Автоматическое обновление $(date '+%Y-%m-%d %H:%M')"
    fi
else
    commit_message="$1"
fi

echo ""
echo "📦 Загружаемые файлы:"
git status -s

echo ""
echo "📝 Сообщение коммита: $commit_message"
echo ""
read -p "Продолжить? (y/n): " confirm

if [ "$confirm" != "y" ]; then
    echo "❌ Отменено"
    exit 0
fi

# Добавляем все изменения
echo ""
echo "➕ Добавление файлов..."
git add .

# Создаём коммит
echo "📝 Создание коммита..."
git commit -m "$commit_message"

# Загружаем на GitHub
echo "🚀 Загрузка на GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "✅ Успешно загружено на GitHub!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "🔗 Репозиторий: https://github.com/bigl01/meatra-restaurant"
    echo ""
    echo "🚀 Vercel автоматически задеплоит изменения через 1-2 минуты"
    echo "   Проверьте: https://vercel.com/dashboard"
    echo ""
    echo "✨ Готово!"
else
    echo ""
    echo "❌ Ошибка при загрузке на GitHub"
    echo ""
    echo "Возможные причины:"
    echo "1. Нет интернета"
    echo "2. Проблемы с аутентификацией"
    echo "3. Конфликты с удалённой версией"
    echo ""
    echo "Попробуйте:"
    echo "  git pull origin main"
    echo "  git push origin main"
    exit 1
fi
