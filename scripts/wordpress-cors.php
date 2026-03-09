<?php
/**
 * CORS для WordPress REST API
 * Загрузите в: wp-content/mu-plugins/cors.php
 * 
 * Замените YOUR_VERCEL_DOMAIN на ваш домен (например: meatra.vercel.app или testdomen.store)
 */

add_filter('rest_pre_serve_request', function($value) {
    $allowed_origins = [
        'https://meatra.vercel.app',
        'https://www.meatra.vercel.app',
        'https://testdomen.store',
        'https://www.testdomen.store',
        'https://meatra.by',
        'https://www.meatra.by',
    ];
    
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: $origin");
    }
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    return $value;
});
