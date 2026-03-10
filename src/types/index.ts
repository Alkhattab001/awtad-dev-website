export interface Property {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  short_description_en: string;
  short_description_ar: string;
  full_description_en: string;
  full_description_ar: string;
  cover_image: string;
  gallery_images: string[];
  location_en: string;
  location_ar: string;
  status: 'upcoming' | 'under_construction' | 'ready' | 'sold_out';
  availability_summary: string;
  total_units: number;
  amenities: string[];
  amenities_ar: string[];
  features: string[];
  features_ar: string[];
  created_at: string;
  updated_at: string;
}

export interface Unit {
  id: string;
  property_id: string;
  title_en: string;
  title_ar: string;
  style_code: string;
  brochure_image: string;
  gallery_images?: string[];
  description_en: string;
  description_ar: string;
  availability_status: 'available' | 'reserved' | 'sold';
  price_starting_from?: number;
  area_sqm: number;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  living_rooms: number;
  working_rooms: number;
  floor: string;
  extra_features: string[];
  total_units?: number;
  available_units?: number;
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id?: string;
  property_id?: string;
  unit_id?: string;
  full_name: string;
  phone: string;
  email: string;
  preferred_contact_method: 'email' | 'phone' | 'whatsapp';
  message: string;
  inquiry_type: 'general' | 'project' | 'unit' | 'contact';
  created_at?: string;
}

export interface Article {
  id: string;
  slug: string;
  title_en: string;
  title_ar: string;
  excerpt_en: string;
  excerpt_ar: string;
  cover_image: string;
  category_en: string;
  category_ar: string;
  published_at: string;
}

export type Language = 'en' | 'ar';
