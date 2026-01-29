// Form validation utilities

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone validation (Belarus format)
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  // Accept 375XXXXXXXXX (12 digits) or XXXXXXXXX (9 digits)
  return cleaned.length === 12 || cleaned.length === 9;
}

// Name validation
export function isValidName(name: string): boolean {
  return name.trim().length >= 2 && name.trim().length <= 100;
}

// Date validation (must be in future)
export function isValidFutureDate(dateString: string): boolean {
  try {
    const date = new Date(dateString);
    const now = new Date();
    return date > now && !isNaN(date.getTime());
  } catch {
    return false;
  }
}

// Career form validation
export interface CareerFormData {
  name: string;
  phone: string;
  email?: string;
  position: string;
  message?: string;
}

export function validateCareerForm(data: CareerFormData): ValidationResult {
  const errors: ValidationError[] = [];

  // Name validation
  if (!data.name || !isValidName(data.name)) {
    errors.push({
      field: 'name',
      message: 'Имя должно содержать от 2 до 100 символов',
    });
  }

  // Phone validation
  if (!data.phone || !isValidPhone(data.phone)) {
    errors.push({
      field: 'phone',
      message: 'Введите корректный номер телефона',
    });
  }

  // Email validation (optional)
  if (data.email && !isValidEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'Введите корректный email',
    });
  }

  // Position validation
  if (!data.position || data.position.trim().length === 0) {
    errors.push({
      field: 'position',
      message: 'Выберите вакансию',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Booking form validation
export interface BookingFormData {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  comment?: string;
}

export function validateBookingForm(data: BookingFormData): ValidationResult {
  const errors: ValidationError[] = [];

  // Name validation
  if (!data.name || !isValidName(data.name)) {
    errors.push({
      field: 'name',
      message: 'Имя должно содержать от 2 до 100 символов',
    });
  }

  // Phone validation
  if (!data.phone || !isValidPhone(data.phone)) {
    errors.push({
      field: 'phone',
      message: 'Введите корректный номер телефона',
    });
  }

  // Date validation
  if (!data.date || !isValidFutureDate(data.date)) {
    errors.push({
      field: 'date',
      message: 'Выберите корректную дату в будущем',
    });
  }

  // Time validation
  if (!data.time || !/^([01]\d|2[0-3]):([0-5]\d)$/.test(data.time)) {
    errors.push({
      field: 'time',
      message: 'Выберите корректное время',
    });
  }

  // Guests validation
  if (!data.guests || data.guests < 1 || data.guests > 50) {
    errors.push({
      field: 'guests',
      message: 'Количество гостей должно быть от 1 до 50',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Sanitize HTML (prevent XSS)
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Sanitize form data
export function sanitizeFormData<T extends Record<string, any>>(data: T): T {
  const sanitized = {} as T;
  
  for (const key in data) {
    const value = data[key];
    
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value.trim()) as any;
    } else if (typeof value === 'number') {
      sanitized[key] = value;
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}
