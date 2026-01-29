// Utility functions

export function stripHtml(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

export function formatDate(dateString: string, locale: string = 'ru-RU'): string {
  try {
    if (!dateString) {
      return 'Дата не указана';
    }
    
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.warn('Invalid date string:', dateString);
      return 'Неверная дата';
    }
    
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date:', error, dateString);
    return 'Ошибка форматирования даты';
  }
}

export function formatPhoneNumber(phone: string): string {
  try {
    if (!phone || typeof phone !== 'string') {
      return '';
    }
    
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Format as +375 (XX) XXX-XX-XX
    if (cleaned.startsWith('375') && cleaned.length === 12) {
      return `+${cleaned.slice(0, 3)} (${cleaned.slice(3, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8, 10)}-${cleaned.slice(10)}`;
    }
    
    // Return original if format doesn't match
    return phone;
  } catch (error) {
    console.error('Error formatting phone number:', error, phone);
    return phone || '';
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getImageUrl(url: string | undefined, fallback: string = '/placeholder.jpg'): string {
  if (!url || url === 'false') return fallback;
  return url;
}

export function isToday(dateString: string): boolean {
  try {
    if (!dateString) return false;
    
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return false;
    }
    
    const today = new Date();
    
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  } catch (error) {
    console.error('Error checking isToday:', error, dateString);
    return false;
  }
}

export function scrollToElement(id: string, behavior: ScrollBehavior = 'smooth'): void {
  try {
    if (typeof window === 'undefined') return;
    if (!id) return;
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior, block: 'start' });
    } else {
      console.warn(`Element with id "${id}" not found`);
    }
  } catch (error) {
    console.error('Error scrolling to element:', error, id);
  }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

export function isTablet(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 768 && window.innerWidth < 1024;
}

export function isDesktop(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 1024;
}
