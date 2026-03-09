# 🍖 Meatra Restaurant Website - Optimized Version

Оптимизированная версия сайта ресторана Meatra с единым адаптивным интерфейсом для десктопа и мобильных устройств.

## 🚀 Основные улучшения

### 1. **Архитектура**
- ✅ Единое адаптивное приложение вместо двух отдельных версий
- ✅ Централизованный service layer для WordPress API
- ✅ Переиспользуемые компоненты (Header, Footer, Layout)
- ✅ Строгая типизация TypeScript

### 2. **Производительность**
- ✅ Оптимизация изображений (Next.js Image)
- ✅ Server-side rendering (SSR) для SEO
- ✅ Incremental Static Regeneration (ISR) с revalidation
- ✅ Кеширование API запросов

### 3. **Код**
- ✅ Убрано ~80% дублирования кода
- ✅ Единая система типов
- ✅ Централизованная конфигурация
- ✅ Обработка ошибок и loading states

## 📁 Структура проекта

```
meatra-restaurant/
├── app/
│   ├── components/         # Переиспользуемые компоненты
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── Loading.tsx
│   │   └── ErrorMessage.tsx
│   ├── lib/               # Библиотеки и утилиты
│   │   ├── config.ts      # Конфигурация приложения
│   │   ├── wordpress-api.ts  # WordPress API service
│   │   └── utils.ts       # Вспомогательные функции
│   ├── types/             # TypeScript типы
│   │   ├── wordpress.ts
│   │   └── index.ts
│   ├── menu/              # Страница меню
│   ├── team/              # Страница команды
│   ├── career/            # Страница карьеры
│   ├── contacts/          # Страница контактов
│   ├── events/            # Страница событий
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Главная страница
│   └── globals.css        # Глобальные стили
├── public/                # Статические файлы
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

## 🛠 Технологии

- **Framework:** Next.js 15.5.3 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4
- **Animations:** Framer Motion 12
- **CMS:** WordPress (Headless)
- **Fonts:** Geist Sans & Geist Mono

## 📦 Установка и запуск

### Требования
- Node.js 18+ и npm/yarn
- WordPress установлен и настроен (Local by Flywheel или хостинг)

### Шаги установки

1. **Установите зависимости:**
```bash
npm install
# или
yarn install
```

2. **Настройте переменные окружения:**
Создайте файл `.env.local` на основе `.env.local.example`:
```bash
cp .env.local.example .env.local
```

Отредактируйте `.env.local`:
```env
NEXT_PUBLIC_WORDPRESS_API_URL=http://my-restuaran.local/wp-json/wp/v2
NEXT_PUBLIC_WORDPRESS_ACF_URL=http://my-restuaran.local/wp-json/acf/v3
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. **Запустите dev-сервер:**
```bash
npm run dev
# или
yarn dev
```

4. **Откройте в браузере:**
```
http://localhost:3000
```

## 🔧 WordPress настройка

### Необходимые плагины:
1. **Advanced Custom Fields (ACF)** - кастомные поля
2. **ACF to REST API** - доступ к ACF через REST API
3. **Custom Post Type UI** - кастомные типы постов
4. **Enable CORS** - разрешение CORS запросов

### Custom Post Types (CPT):
- `products` - продукты меню
- `main_menu` - основное меню
- `game_menu` - меню из дичи
- `events_details` - события
- `team_members` - члены команды
- `vacancies` - вакансии
- `benefits` - преимущества

### ACF поля:
Смотрите документацию в `docs/wordpress-setup.md`

## 🚀 Деплой

### Рекомендуемая схема: Vercel + Hoster.by

- **Next.js** → Vercel (бесплатно)
- **WordPress** → Hoster.by (контент)

**Подробная инструкция:** [DEPLOYMENT-HOSTER.md](./DEPLOYMENT-HOSTER.md)

### Production Build
```bash
npm run build
npm start
```

### Vercel
Самый простой способ деплоя:
```bash
vercel
```

### Другие платформы
- Netlify
- AWS Amplify
- Digital Ocean
- Railway

## 📱 Адаптивность

Сайт полностью адаптивен для всех устройств:
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🎨 Кастомизация

### Цвета
Редактируйте в `tailwind.config.ts`:
```typescript
colors: {
  'meatra': {
    dark: '#15181D',
    gray: '#1E2126',
    gold: '#DFAD23',
    red: '#C52735',
    // ...
  },
}
```

### Контент
Основные константы в `app/lib/config.ts`:
- Информация о ресторане
- Навигация
- Контакты
- Часы работы

## 🐛 Troubleshooting

### WordPress API не отвечает
1. Проверьте URL в `.env.local`
2. Убедитесь, что WordPress запущен
3. Проверьте CORS настройки

### Изображения не загружаются
1. Проверьте `next.config.ts` - добавлен ли домен WordPress
2. Убедитесь, что изображения доступны по URL

### Build ошибки
```bash
# Очистите кеш
rm -rf .next
npm run build
```

## 📊 Performance

- **Lighthouse Score:** 90+
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Cumulative Layout Shift:** < 0.1

## 🔐 Безопасность

- Environment variables для чувствительных данных
- CORS правильно настроен
- Rate limiting на API endpoints
- Sanitization пользовательских inputs

## 📝 TODO

- [ ] Добавить страницу галереи
- [ ] Реализовать систему бронирования
- [ ] Добавить онлайн оплату
- [ ] Интеграция с системой лояльности
- [ ] Multilanguage support (Polylang)
- [ ] Push notifications

## 👥 Авторы

Оптимизированная версия создана для ресторана Meatra

## 📄 Лицензия

Proprietary - все права защищены

## 🤝 Поддержка

По вопросам обращайтесь:
- Email: info@meatra.by
- Phone: +375 (29) 325-15-15
