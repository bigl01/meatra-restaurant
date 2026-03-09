#!/bin/bash
# Выводит переменные окружения для копирования в Vercel
# Использование: ./scripts/setup-env.sh [домен-wordpress] [домен-сайта]

WP_DOMAIN="${1:-testdomen.store}"
SITE_DOMAIN="${2:-meatra.vercel.app}"

echo "# Скопируйте эти переменные в Vercel → Settings → Environment Variables"
echo ""
echo "NEXT_PUBLIC_WORDPRESS_API_URL=https://${WP_DOMAIN}/wp-json/wp/v2"
echo "NEXT_PUBLIC_WORDPRESS_ACF_URL=https://${WP_DOMAIN}/wp-json/acf/v3"
echo "NEXT_PUBLIC_SITE_URL=https://${SITE_DOMAIN}"
echo ""
