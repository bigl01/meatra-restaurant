// WordPress API Types

export interface WordPressImage {
  id: number;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface WordPressRendered {
  rendered: string;
}

export interface WordPressACF {
  [key: string]: any;
}

export interface WordPressPost {
  id: number;
  date: string;
  slug: string;
  status: string;
  title: WordPressRendered;
  content: WordPressRendered;
  excerpt: WordPressRendered;
  acf?: WordPressACF;
  _embedded?: {
    'wp:featuredmedia'?: WordPressImage[];
  };
}

// Product Types
export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price?: string;
  weight?: string;
  ingredients?: string;
  category?: string;
  type?: 'special' | 'dish' | 'drink';
}

// Menu Types
export interface MenuItem {
  id: number;
  title: string;
  price: string;
  weight: string;
  ingredients: string;
  category: string;
  image?: string;
}

// Event Types
export interface Event {
  id: number;
  slug: string;
  title: string;
  date: string;
  description: string;
  image: string;
  galleryImages: string[];
}

// Team Member Types
export interface TeamMember {
  id: number;
  name: string;
  position: string;
  description: string;
  image: string;
  shortDescription?: string;
}

// Vacancy Types
export interface Vacancy {
  id: number;
  title: string;
  description: string;
  requirements?: string[];
  responsibilities?: string[];
}

// Benefit Types
export interface Benefit {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

// Interior Types
export interface InteriorGallery {
  id: number;
  images: {
    top: string[];
    center: string;
    bottom: string[];
  };
  page: number;
}

// Contact Types
export interface Contact {
  address: string;
  phone: string;
  email: string;
  workingHours: {
    weekdays: string;
    weekend: string;
    sunday: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Form Types
export interface BookingForm {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  comment?: string;
}

export interface CareerForm {
  name: string;
  phone: string;
  email?: string;
  position: string;
  message?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
}
