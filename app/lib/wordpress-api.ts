// WordPress API Service Layer
import { 
  Product, 
  MenuItem, 
  Event, 
  TeamMember, 
  Vacancy, 
  Benefit,
  WordPressPost,
  ApiResponse,
} from '@/app/types';
import { WORDPRESS_API_URL, WORDPRESS_ACF_URL, API_ENDPOINTS } from './config';

// Generic fetch function with error handling
async function fetchFromWordPress<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const url = endpoint.startsWith('/pages') 
      ? `${WORDPRESS_ACF_URL}${endpoint}` 
      : `${WORDPRESS_API_URL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching from WordPress:`, error);
    throw error;
  }
}

// Transform WordPress product to our Product type
function transformProduct(wpProduct: any): Product {
  return {
    id: wpProduct.id,
    name: wpProduct.title?.rendered || 'Без названия',
    image: wpProduct.acf?.product_image || wpProduct.acf?.image || '/placeholder.jpg',
    description: wpProduct.acf?.short_description || wpProduct.acf?.description || '',
    price: wpProduct.acf?.price || '',
    weight: wpProduct.acf?.weight || '',
    ingredients: wpProduct.acf?.ingredients || '',
    category: wpProduct.acf?.category || '',
    type: wpProduct.acf?.product_type || wpProduct.acf?.type,
  };
}

// Transform WordPress post to Event
function transformEvent(wpPost: any): Event {
  const galleryImages = [
    wpPost.acf?.gallery_image_1,
    wpPost.acf?.gallery_image_2,
    wpPost.acf?.gallery_image_3,
  ].filter(img => img && img !== 'false');

  return {
    id: wpPost.id,
    slug: wpPost.slug,
    title: wpPost.title?.rendered || '',
    date: wpPost.acf?.event_date || wpPost.date,
    description: wpPost.acf?.description || wpPost.content?.rendered || '',
    image: wpPost.acf?.main_image || wpPost.acf?.image || '/placeholder.jpg',
    galleryImages,
  };
}

// Transform WordPress post to Team Member
function transformTeamMember(wpPost: any): TeamMember {
  return {
    id: wpPost.id,
    name: wpPost.title?.rendered || 'Сотрудник',
    position: wpPost.acf?.position || '',
    description: wpPost.acf?.description || wpPost.acf?.short_description || '',
    shortDescription: wpPost.acf?.short_description || '',
    image: wpPost.acf?.photo || wpPost.acf?.image || '/placeholder.jpg',
  };
}

// API Functions

export async function getProducts(params?: { type?: string; perPage?: number }): Promise<Product[]> {
  try {
    const queryParams = new URLSearchParams();
    if (params?.perPage) queryParams.append('per_page', params.perPage.toString());
    queryParams.append('_embed', 'true');

    const endpoint = `${API_ENDPOINTS.products}?${queryParams.toString()}`;
    const products = await fetchFromWordPress<any[]>(endpoint);

    let transformedProducts = products.map(transformProduct);

    // Filter by type if specified
    if (params?.type) {
      transformedProducts = transformedProducts.filter(p => p.type === params.type);
    }

    return transformedProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getMainMenu(): Promise<MenuItem[]> {
  try {
    const endpoint = `${API_ENDPOINTS.mainMenu}?per_page=100`;
    const items = await fetchFromWordPress<any[]>(endpoint);

    return items.map(item => ({
      id: item.id,
      title: item.title?.rendered || '',
      price: item.acf?.price || '',
      weight: item.acf?.weight || '',
      ingredients: item.acf?.ingredients || '',
      category: item.acf?.category || '',
      image: item.acf?.image || '',
    }));
  } catch (error) {
    console.error('Error fetching main menu:', error);
    return [];
  }
}

export async function getGameMenu(): Promise<MenuItem[]> {
  try {
    const endpoint = `${API_ENDPOINTS.gameMenu}?per_page=100`;
    const items = await fetchFromWordPress<any[]>(endpoint);

    return items.map(item => ({
      id: item.id,
      title: item.title?.rendered || '',
      price: item.acf?.price || '',
      weight: item.acf?.weight || '',
      ingredients: item.acf?.ingredients || '',
      category: item.acf?.category || '',
      image: item.acf?.image || '',
    }));
  } catch (error) {
    console.error('Error fetching game menu:', error);
    return [];
  }
}

export async function getEvents(): Promise<Event[]> {
  try {
    const endpoint = `${API_ENDPOINTS.events}?_embed`;
    const events = await fetchFromWordPress<any[]>(endpoint);
    
    return events.map(transformEvent);
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  try {
    const events = await getEvents();
    return events.find(event => event.slug === slug) || null;
  } catch (error) {
    console.error(`Error fetching event by slug ${slug}:`, error);
    return null;
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const endpoint = `${API_ENDPOINTS.team}?per_page=50`;
    const members = await fetchFromWordPress<any[]>(endpoint);
    
    return members.map(transformTeamMember);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}

export async function getVacancies(): Promise<Vacancy[]> {
  try {
    const endpoint = `${API_ENDPOINTS.vacancies}?per_page=50`;
    const vacancies = await fetchFromWordPress<any[]>(endpoint);
    
    return vacancies.map(vacancy => ({
      id: vacancy.id,
      title: vacancy.title?.rendered || '',
      description: vacancy.acf?.description || vacancy.content?.rendered || '',
      requirements: vacancy.acf?.requirements || [],
      responsibilities: vacancy.acf?.responsibilities || [],
    }));
  } catch (error) {
    console.error('Error fetching vacancies:', error);
    return [];
  }
}

export async function getBenefits(): Promise<Benefit[]> {
  try {
    const endpoint = `${API_ENDPOINTS.benefits}?per_page=50`;
    const benefits = await fetchFromWordPress<any[]>(endpoint);
    
    return benefits.map(benefit => ({
      id: benefit.id,
      title: benefit.title?.rendered || '',
      description: benefit.content?.rendered || benefit.acf?.description || '',
      icon: benefit.acf?.icon || '',
    }));
  } catch (error) {
    console.error('Error fetching benefits:', error);
    return [];
  }
}

export async function getInteriorImages(pageId: number = 53): Promise<any> {
  try {
    const endpoint = API_ENDPOINTS.interior(pageId);
    const data = await fetchFromWordPress<any>(endpoint);
    
    return data.acf || {};
  } catch (error) {
    console.error('Error fetching interior images:', error);
    return {};
  }
}

// Client-side API calls (for forms, etc.)
export async function submitCareerApplication(data: any): Promise<ApiResponse<void>> {
  try {
    const response = await fetch('/api/career', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit application');
    }

    return { success: true, data: undefined };
  } catch (error) {
    return { 
      success: false, 
      data: undefined,
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

export async function submitBooking(data: any): Promise<ApiResponse<void>> {
  try {
    const response = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit booking');
    }

    return { success: true, data: undefined };
  } catch (error) {
    return { 
      success: false, 
      data: undefined,
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}
