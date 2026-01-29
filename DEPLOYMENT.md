# 🚀 Руководство по развертыванию Meatra Restaurant

## Локальное развертывание

### 1. Установка Node.js

Скачайте и установите Node.js 18+ с официального сайта:
https://nodejs.org/

Проверьте установку:
```bash
node --version
npm --version
```

### 2. Настройка WordPress

#### Вариант A: Local by Flywheel (Рекомендуется для локальной разработки)

1. Скачайте Local by Flywheel: https://localwp.com/
2. Установите и запустите
3. Создайте новый сайт "my-restuaran"
4. Установите WordPress
5. Установите необходимые плагины:
   - Advanced Custom Fields (ACF)
   - ACF to REST API
   - Custom Post Type UI
   - Enable CORS

#### Вариант B: XAMPP/MAMP

1. Установите XAMPP или MAMP
2. Скопируйте WordPress в папку htdocs/www
3. Создайте базу данных MySQL
4. Установите WordPress
5. Установите необходимые плагины

### 3. Настройка Custom Post Types

В WordPress Admin:

1. **Перейдите в CPT UI > Add New**
2. Создайте следующие типы постов:

**Products:**
```
Post Type Slug: products
Plural Label: Products
Singular Label: Product
REST API: Enabled
Has Archive: Yes
```

**Main Menu:**
```
Post Type Slug: main_menu
Plural Label: Main Menu
Singular Label: Menu Item
REST API: Enabled
```

**Game Menu:**
```
Post Type Slug: game_menu
Plural Label: Game Menu
Singular Label: Game Menu Item
REST API: Enabled
```

**Events:**
```
Post Type Slug: events_details
Plural Label: Events
Singular Label: Event
REST API: Enabled
Has Archive: Yes
```

**Team Members:**
```
Post Type Slug: team_members
Plural Label: Team Members
Singular Label: Team Member
REST API: Enabled
```

**Vacancies:**
```
Post Type Slug: vacancies
Plural Label: Vacancies
Singular Label: Vacancy
REST API: Enabled
```

### 4. Настройка ACF полей

#### Products (products):
- `product_image` - Image
- `short_description` - Text Area
- `price` - Text
- `weight` - Text
- `ingredients` - Text Area
- `product_type` - Select (special, dish, drink)
- `category` - Text

#### Menu Items (main_menu, game_menu):
- `price` - Text
- `weight` - Text
- `ingredients` - Text Area
- `category` - Text
- `image` - Image

#### Events (events_details):
- `event_date` - Date Picker
- `description` - WYSIWYG Editor
- `main_image` - Image
- `gallery_image_1` - Image
- `gallery_image_2` - Image
- `gallery_image_3` - Image

#### Team Members (team_members):
- `position` - Text
- `short_description` - Text Area
- `description` - WYSIWYG Editor
- `photo` - Image

#### Vacancies (vacancies):
- `description` - WYSIWYG Editor
- `requirements` - Repeater
- `responsibilities` - Repeater

#### Benefits (benefits):
- `description` - Text Area
- `icon` - Image

#### Interior Page (page_id: 53):
- `top1` through `top6` - Images
- `center`, `center2` - Images
- `bottom1` through `bottom4` - Images

### 5. Установка Next.js проекта

```bash
# Перейдите в папку проекта
cd /path/to/NEW/meatra-restaurant

# Установите зависимости
npm install

# Создайте .env.local файл
cp .env.local.example .env.local

# Отредактируйте .env.local с правильными URL
nano .env.local
```

Пример `.env.local`:
```env
NEXT_PUBLIC_WORDPRESS_API_URL=http://my-restuaran.local/wp-json/wp/v2
NEXT_PUBLIC_WORDPRESS_ACF_URL=http://my-restuaran.local/wp-json/acf/v3
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 6. Копирование изображений

Скопируйте изображения из старого проекта:
```bash
# Скопируйте из meatra_mobile или meatra
cp -r ../meatra_web/meatra_mobile/my-restaurant-frontend/public/* public/
```

### 7. Запуск dev-сервера

```bash
npm run dev
```

Откройте http://localhost:3000

## Production развертывание

### Vercel (Рекомендуется)

1. **Создайте аккаунт на Vercel:** https://vercel.com/

2. **Установите Vercel CLI:**
```bash
npm i -g vercel
```

3. **Deploy:**
```bash
vercel
```

4. **Настройте environment variables в Vercel Dashboard:**
- `NEXT_PUBLIC_WORDPRESS_API_URL`
- `NEXT_PUBLIC_WORDPRESS_ACF_URL`
- `NEXT_PUBLIC_SITE_URL`

### Netlify

1. Создайте аккаунт на Netlify
2. Подключите GitHub репозиторий
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Добавьте environment variables

### VPS/Server

1. **Установите Node.js на сервер**
2. **Клонируйте проект:**
```bash
git clone <your-repo>
cd meatra-restaurant
```

3. **Установите зависимости:**
```bash
npm install
```

4. **Build:**
```bash
npm run build
```

5. **Настройте PM2:**
```bash
npm install -g pm2
pm2 start npm --name "meatra" -- start
pm2 save
pm2 startup
```

6. **Настройте Nginx:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. **SSL с Let's Encrypt:**
```bash
sudo certbot --nginx -d your-domain.com
```

## WordPress Production

### Хостинг WordPress

Рекомендуемые хостинги:
- **WP Engine** - премиум WordPress хостинг
- **Kinsta** - быстрый managed WordPress
- **SiteGround** - надежный и доступный
- **DigitalOcean** - VPS для опытных пользователей

### Настройка

1. **Установите WordPress на хостинг**
2. **Установите все плагины**
3. **Импортируйте данные с локального сайта:**
   - Используйте плагин "All-in-One WP Migration"
   - Или экспортируйте/импортируйте XML

4. **Обновите URLs:**
```sql
UPDATE wp_options SET option_value = 'https://api.your-domain.com' 
WHERE option_name = 'siteurl' OR option_name = 'home';
```

5. **Настройте CORS в .htaccess:**
```apache
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "https://your-frontend-domain.com"
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization"
</IfModule>
```

## Troubleshooting

### WordPress API не работает
```bash
# Проверьте permalinks
# В WordPress Admin > Settings > Permalinks
# Выберите "Post name" и сохраните
```

### Изображения не загружаются
1. Проверьте permissions папки uploads
2. Добавьте домен в `next.config.ts`
3. Проверьте CORS настройки

### Build fails
```bash
# Очистите кеш
rm -rf .next node_modules
npm install
npm run build
```

## Мониторинг и обслуживание

### Логи
```bash
# PM2 logs
pm2 logs meatra

# Vercel logs
vercel logs
```

### Обновления
```bash
# Обновите зависимости
npm update

# Проверьте уязвимости
npm audit
npm audit fix
```

### Backup

Регулярно создавайте backup:
1. WordPress базы данных
2. WordPress файлов (wp-content)
3. Next.js кода (через Git)

## Производительность

### Кеширование

WordPress:
- Установите WP Super Cache или W3 Total Cache
- Настройте CDN (Cloudflare)

Next.js:
- Используется автоматический ISR
- Настройте CDN для static assets

### Оптимизация изображений

```bash
# Сжатие изображений
npm install -g imagemin-cli
imagemin public/*.{jpg,png} --out-dir=public/optimized
```

## Поддержка

При возникновении проблем:
1. Проверьте документацию
2. Посмотрите логи
3. Свяжитесь с разработчиком

Email: info@meatra.by
Phone: +375 (29) 325-15-15
