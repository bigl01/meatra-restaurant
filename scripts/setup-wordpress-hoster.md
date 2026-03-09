# Установка WordPress на Hoster.by

## 1. Вход в cPanel

- URL: https://vh148.hoster.by:2083
- Логин: atestdomen
- Пароль: (ваш пароль)

## 2. Установка WordPress

### Вариант A: Через Softaculous (если доступен)

1. Найдите **Softaculous Apps Installer** в cPanel
2. Выберите **WordPress**
3. Настройки:
   - **Domain**: выберите домен или создайте поддомен `wp.meatra.by`
   - **Directory**: оставьте пустым для корня или `wp` для поддомена
   - **Admin Username**: придумайте логин
   - **Admin Password**: надёжный пароль
   - **Admin Email**: ваш email

### Вариант B: Ручная установка

1. Скачайте WordPress с https://wordpress.org/download/
2. Загрузите через **File Manager** в `public_html`
3. Создайте базу данных MySQL в **MySQL Databases**
4. Откройте ваш-домен.by в браузере и следуйте мастеру установки

## 3. Необходимые плагины

После установки WordPress:

1. **Плагины → Добавить новый**
2. Установите и активируйте:
   - Advanced Custom Fields (ACF)
   - ACF to REST API
   - Custom Post Type UI
   - WP CORS (или Enable CORS)

## 4. CORS настройка

Создайте файл `wp-content/mu-plugins/cors.php`:

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

## 5. Custom Post Types

См. полную инструкцию в `DEPLOYMENT.md` — раздел "Настройка Custom Post Types"
