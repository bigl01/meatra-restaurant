// Configuration constants

export const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://my-restuaran.local/wp-json/wp/v2';
export const WORDPRESS_ACF_URL = process.env.NEXT_PUBLIC_WORDPRESS_ACF_URL || 'http://my-restuaran.local/wp-json/acf/v3';

export const RESTAURANT_INFO = {
  name: 'Meatra',
  tagline: 'Ресторан для настоящих ценителей мяса в самом сердце Бреста',
  address: 'ул. Куйбышева 33, Брест',
  phone: '+375 (29) 325-15-15',
  email: 'info@meatra.by',
  coordinates: {
    lat: 52.093882,
    lng: 23.693894,
  },
  workingHours: {
    weekdays: 'Пн–Чт: 11:00 – 23:00',
    weekend: 'Пт–Сб: 11:00 – 01:00',
    sunday: 'Вс: 11:00 – 23:00',
  },
  social: {
    instagram: '@meatra_brest',
    yandexEda: 'https://eda.yandex.ru',
  },
};

export const NAV_ITEMS = [
  { name: 'Главная', href: '/' },
  { name: 'Меню', href: '/menu' },
  { name: 'События', href: '/events' },
  { name: 'Галерея', href: '/gallery' },
  { name: 'Команда', href: '/team' },
  { name: 'Карьера', href: '/career' },
  { name: 'Контакты', href: '/contacts' },
];

export const API_ENDPOINTS = {
  products: '/products',
  mainMenu: '/main_menu',
  gameMenu: '/game_menu',
  events: '/events_details',
  team: '/team_members',
  vacancies: '/vacancies',
  benefits: '/benefits',
  interior: (pageId: number) => `/pages/${pageId}`,
};

export const REVALIDATE_TIME = 3600; // 1 hour in seconds
