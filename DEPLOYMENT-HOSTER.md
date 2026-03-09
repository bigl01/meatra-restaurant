# 🚀 Развёртывание Meatra на Hoster.by + Vercel

## Важно: архитектура развёртывания

**Hoster.by shared hosting НЕ поддерживает Node.js.** Поэтому используется гибридная схема:

| Компонент | Где размещается | Зачем |
|-----------|-----------------|-------|
| **WordPress** (админка, контент) | Hoster.by | Управление меню, событиями, командой |
| **Next.js** (сайт) | Vercel (бесплатно) | Быстрый фронтенд, SEO |
| **Домен** | DNS на Hoster.by | meatra.by → Vercel, wp.meatra.by → Hoster.by |

---

## Шаг 1: Настройка DNS

В панели управления доменом (где зарегистрирован meatra.by) укажите:

```
Первичный NS:   ns1.hoster.by
Вторичный NS:   ns2.hoster.by
```

После смены NS подождите 24–48 часов для распространения.

---

## Шаг 2: WordPress на Hoster.by

### 2.1 Установка WordPress

1. Войдите в **cPanel**: https://vh148.hoster.by:2083  
   - Логин: `atestdomen`  
   - Пароль: (ваш пароль)

2. Найдите **"WordPress"** или **"Softaculous"** в cPanel

3. Установите WordPress в корень: `/public_html`  
   - Или создайте поддомен `wp.meatra.by` → папка `public_html/wp`

4. Запомните URL админки, например: `https://wp.meatra.by/wp-admin`

### 2.2 Необходимые плагины WordPress

Установите через Плагины → Добавить новый:

- **Advanced Custom Fields (ACF)** — кастомные поля
- **ACF to REST API** — доступ ACF через REST API
- **Custom Post Type UI** — типы записей (products, main_menu, events_details и т.д.)
- **Enable CORS** или **WP CORS** — разрешение запросов с Vercel

### 2.3 CORS для API

Создайте файл `/public_html/wp-content/mu-plugins/cors-header.php`:

```php
<?php
add_filter('rest_pre_serve_request', function($value) {
    header('Access-Control-Allow-Origin: https://meatra.by');
    header('Access-Control-Allow-Origin: https://www.meatra.by');
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    return $value;
});
```

Или добавьте в `.htaccess` в корне WordPress:

```apache
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "https://meatra.by"
    Header set Access-Control-Allow-Methods "GET, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type"
</IfModule>
```

### 2.4 Custom Post Types

В WordPress: **CPT UI → Add New** — создайте типы из `DEPLOYMENT.md` (products, main_menu, game_menu, events_details, team_members, vacancies, benefits).

---

## Шаг 3: Деплой Next.js на Vercel

### 3.1 Подключение GitHub

1. Зайдите на https://vercel.com и войдите через GitHub
2. **Add New Project** → выберите `bigl01/meatra-restaurant`
3. Framework Preset: **Next.js** (определится автоматически)

### 3.2 Переменные окружения в Vercel

В настройках проекта → **Settings → Environment Variables** добавьте:

| Имя | Значение | Пример |
|-----|----------|--------|
| `NEXT_PUBLIC_WORDPRESS_API_URL` | URL WordPress REST API | `https://wp.meatra.by/wp-json/wp/v2` |
| `NEXT_PUBLIC_WORDPRESS_ACF_URL` | URL ACF API | `https://wp.meatra.by/wp-json/acf/v3` |
| `NEXT_PUBLIC_SITE_URL` | URL сайта | `https://meatra.by` |

### 3.3 Домен в Vercel

1. **Settings → Domains** → Add `meatra.by` и `www.meatra.by`
2. Vercel покажет DNS-записи. В панели Hoster.by (или где управляете DNS) добавьте:

   - **A-запись**: `@` → `76.76.21.21` (IP Vercel, уточните в Vercel)
   - **CNAME**: `www` → `cname.vercel-dns.com`

---

## Шаг 4: Настройка next.config для production

В `next.config.ts` в `images.remotePatterns` добавьте домен WordPress:

```ts
{
  protocol: 'https',
  hostname: 'wp.meatra.by',  // ваш поддомен WordPress
  pathname: '/**',
},
```

---

## Шаг 5: Проверка

1. **WordPress API**: откройте `https://wp.meatra.by/wp-json/wp/v2/posts` — должен вернуться JSON
2. **Сайт**: откройте `https://meatra.by` — должен загрузиться Next.js
3. **Контент**: меню, события, команда подтягиваются из WordPress

---

## Обновление контента

1. Заходите в **WordPress** → `https://wp.meatra.by/wp-admin`
2. Редактируете меню, события, команду и т.д.
3. Next.js на Vercel кеширует данные на 1 час (ISR). Чтобы обновить быстрее — в Vercel можно сделать **Redeploy** или настроить **Webhook** для revalidate.

---

## Контакты хостинга

- **FTP**: vh148.hoster.by
- **SSH**: порт 22 (если доступен)
- **Путь к сайту**: `/home/atestdomen/public_html`
- **IP**: 93.125.99.152

---

## Безопасность

⚠️ **После настройки смените пароль cPanel** — он был указан в запросе.  
Рекомендуется использовать менеджер паролей и не хранить пароли в открытом виде.
