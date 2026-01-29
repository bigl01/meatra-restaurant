export * from './wordpress';

// UI Component Types
export interface NavItem {
  name: string;
  href: string;
  icon?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface CarouselItem {
  id: number;
  image: string;
  title: string;
  description: string;
}
