import type { Property, Unit, Inquiry } from '@/types';
import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';
import floorplan1 from '@/assets/floorplan-1.jpg';

// ─── BASE CONFIG ─────────────────────────────────────────
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const API_BASE_URL = `${STRAPI_URL}/api`;

// ─── STRAPI RESPONSE TYPES ───────────────────────────────
interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiBuilding {
  id: number;
  documentId: string;
  name: string;
  name_ar: string;
  slug: string;
  description: string;
  description_ar: string;
  location: string;
  location_ar: string;
  building_status: 'upcoming' | 'under_construction' | 'ready' | 'sold_out';
  featured: boolean;
  image?: { url: string };
  gallery?: { url: string }[];
  properties?: StrapiProperty[];
  amenities?: string[];
  amenities_ar?: string[];
  features?: string[];
  features_ar?: string[];
  createdAt: string;
  updatedAt: string;
}

interface StrapiProperty {
  id: number;
  documentId: string;
  name: string;
  name_ar: string;
  slug: string;
  description: string;
  description_ar: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  property_status: 'available' | 'reserved' | 'sold';
  property_type: string;
  floors: number;
  living_rooms: number;
  balconies: number;
  working_rooms: number;
  total_units: number;
  available_units: number;
  image?: { url: string };
  gallery?: { url: string }[];
  floorplan?: { url: string };
  amenities: string[];
  building?: StrapiBuilding;
  createdAt: string;
  updatedAt: string;
}

interface StrapiUnit {
  id: number;
  documentId: string;
  name: string;
  name_ar: string;
  unit_number: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  floor: number;
  unit_status: 'available' | 'reserved' | 'sold';
  image?: { url: string };
  floorplan?: { url: string };
  property?: StrapiProperty;
  createdAt: string;
  updatedAt: string;
}

// ─── HELPER FUNCTIONS ────────────────────────────────────
function getImageUrl(image?: { url: string }): string {
  if (!image?.url) return property1;
  if (image.url.startsWith('http')) return image.url;
  return `${STRAPI_URL}${image.url}`;
}

function mapBuildingToProperty(building: StrapiBuilding): Property {
  // Calculate total and available units from all property types
  const totalUnits = building.properties?.reduce((sum, p) => sum + (p.total_units || 0), 0) || 0;
  const availableUnits = building.properties?.reduce((sum, p) => sum + (p.available_units || 0), 0) || 0;
  const typeCount = building.properties?.length || 0;

  return {
    id: building.documentId || String(building.id),
    slug: building.slug,
    name_en: building.name,
    name_ar: building.name_ar,
    short_description_en: building.description?.slice(0, 150) + '...',
    short_description_ar: building.description_ar?.slice(0, 150) + '...',
    full_description_en: building.description,
    full_description_ar: building.description_ar,
    cover_image: getImageUrl(building.image),
    gallery_images: building.gallery?.map(img => getImageUrl(img)) || [],
    location_en: building.location,
    location_ar: building.location_ar,
    status: building.building_status || 'upcoming',
    availability_summary: availableUnits > 0
      ? `${availableUnits} units available`
      : `${typeCount} types available`,
    total_units: totalUnits || typeCount,
    amenities: building.amenities || [],
    amenities_ar: building.amenities_ar || [],
    features: building.features || [],
    features_ar: building.features_ar || [],
    created_at: building.createdAt,
    updated_at: building.updatedAt,
  };
}

function mapStrapiUnit(unit: StrapiUnit, propertyId: string): Unit {
  return {
    id: unit.documentId || String(unit.id),
    property_id: propertyId,
    title_en: unit.name,
    title_ar: unit.name_ar || unit.name,
    style_code: unit.unit_number,
    brochure_image: getImageUrl(unit.floorplan) || floorplan1,
    description_en: `${unit.bedrooms} bedroom unit with ${unit.area} sqm`,
    description_ar: `وحدة بـ ${unit.bedrooms} غرف نوم بمساحة ${unit.area} متر مربع`,
    availability_status: unit.unit_status || 'available',
    price_starting_from: unit.price,
    area_sqm: unit.area,
    bedrooms: unit.bedrooms,
    bathrooms: unit.bathrooms,
    balconies: 1,
    living_rooms: 1,
    working_rooms: 0,
    floor: String(unit.floor),
        extra_features: [],
    created_at: unit.createdAt,
    updated_at: unit.updatedAt,
  };
}

// ─── MOCK DATA (FALLBACK) ────────────────────────────────
const mockProperties: Property[] = [
  {
    id: '1',
    slug: 'al-noor-residences',
    name_en: 'Al Noor Residences',
    name_ar: 'مساكن النور',
    short_description_en: 'Premium waterfront living with panoramic views of the coastline. A landmark of modern luxury.',
    short_description_ar: 'سكن فاخر على الواجهة البحرية مع إطلالات بانورامية على الساحل.',
    full_description_en: 'Al Noor Residences represents the pinnacle of coastal luxury living. Strategically positioned along the waterfront, each residence offers unobstructed views of the sea and the city skyline.',
    full_description_ar: 'تمثل مساكن النور قمة الحياة الساحلية الفاخرة. تقع في موقع استراتيجي على الواجهة البحرية.',
    cover_image: property1,
    gallery_images: [property1, property2],
    location_en: 'Al Mouj, Muscat',
    location_ar: 'الموج، مسقط',
    status: 'under_construction',
    availability_summary: '24 units available',
    total_units: 120,
    amenities: ['Swimming Pool', 'Gym', 'Private Beach', 'Concierge', 'Parking', 'Garden'],
    amenities_ar: ['مسبح', 'صالة رياضية', 'شاطئ خاص', 'خدمة الكونسيرج', 'مواقف سيارات', 'حديقة'],
    features: ['Smart Home', 'Sea View', 'High Ceilings', 'Premium Finishes'],
    features_ar: ['منزل ذكي', 'إطلالة بحرية', 'أسقف عالية', 'تشطيبات فاخرة'],
    created_at: '2024-01-15',
    updated_at: '2024-06-01',
  },
  {
    id: '2',
    slug: 'sahara-villas',
    name_en: 'Sahara Villas',
    name_ar: 'فلل صحارى',
    short_description_en: 'Exclusive villa community blending traditional architecture with contemporary design.',
    short_description_ar: 'مجتمع فلل حصري يمزج بين العمارة التقليدية والتصميم المعاصر.',
    full_description_en: 'Sahara Villas offers an exclusive community of luxury villas that seamlessly blend traditional Omani architectural heritage with cutting-edge contemporary design.',
    full_description_ar: 'توفر فلل صحارى مجتمعاً حصرياً من الفلل الفاخرة التي تمزج بين التراث المعماري العماني والتصميم المعاصر.',
    cover_image: property2,
    gallery_images: [property2, property3],
    location_en: 'Al Khoud, Muscat',
    location_ar: 'الخوض، مسقط',
    status: 'ready',
    availability_summary: '8 villas remaining',
    total_units: 45,
    amenities: ['Community Pool', 'Clubhouse', 'Playground', 'Walking Trails', 'Security'],
    amenities_ar: ['مسبح مشترك', 'نادي', 'ملعب أطفال', 'مسارات المشي', 'أمن'],
    features: ['Private Garden', 'Double Garage', 'Maid Room', 'Storage'],
    features_ar: ['حديقة خاصة', 'كراج مزدوج', 'غرفة خادمة', 'مخزن'],
    created_at: '2023-08-10',
    updated_at: '2024-05-20',
  },
  {
    id: '3',
    slug: 'the-summit-tower',
    name_en: 'The Summit Tower',
    name_ar: 'برج القمة',
    short_description_en: 'A mixed-use landmark tower offering premium commercial and residential spaces in the heart of the city.',
    short_description_ar: 'برج متعدد الاستخدامات يوفر مساحات تجارية وسكنية فاخرة في قلب المدينة.',
    full_description_en: 'The Summit Tower rises as an iconic addition to the city skyline, offering a curated mix of luxury apartments, premium office spaces, and retail destinations.',
    full_description_ar: 'يرتفع برج القمة كإضافة مميزة إلى أفق المدينة، ويوفر مزيجاً من الشقق الفاخرة والمساحات المكتبية المتميزة.',
    cover_image: property3,
    gallery_images: [property3, property1],
    location_en: 'CBD, Muscat',
    location_ar: 'المنطقة التجارية، مسقط',
    status: 'upcoming',
    availability_summary: 'Pre-registration open',
    total_units: 200,
    amenities: ['Rooftop Lounge', 'Business Center', 'Valet Parking', 'Retail Mall', 'Sky Gym'],
    amenities_ar: ['صالة على السطح', 'مركز أعمال', 'خدمة صف السيارات', 'مول تجاري', 'صالة رياضية'],
    features: ['City View', 'Floor-to-ceiling Glass', 'Smart Building', 'Green Certified'],
    features_ar: ['إطلالة على المدينة', 'زجاج من الأرض للسقف', 'مبنى ذكي', 'شهادة خضراء'],
    created_at: '2024-03-01',
    updated_at: '2024-06-15',
  },
];

const mockUnits: Unit[] = [
  {
    id: 'u1',
    property_id: '1',
    title_en: 'Type A — 1 Bedroom Suite',
    title_ar: 'النوع أ — جناح غرفة نوم واحدة',
    style_code: 'TYPE-A',
    brochure_image: floorplan1,
    description_en: 'An elegantly designed one-bedroom suite offering open-plan living with premium sea views.',
    description_ar: 'جناح بغرفة نوم واحدة مصمم بأناقة مع إطلالة بحرية مميزة.',
    availability_status: 'available',
    price_starting_from: 85000,
    area_sqm: 75,
    bedrooms: 1,
    bathrooms: 1,
    balconies: 1,
    living_rooms: 1,
    working_rooms: 0,
    floor: '3-12',
    extra_features: ['Walk-in Closet', 'Built-in Kitchen'],
    created_at: '2024-01-15',
    updated_at: '2024-06-01',
  },
  {
    id: 'u2',
    property_id: '1',
    title_en: 'Type B — 2 Bedroom Residence',
    title_ar: 'النوع ب — شقة غرفتين نوم',
    style_code: 'TYPE-B',
    brochure_image: floorplan1,
    description_en: 'A spacious two-bedroom residence with generous living areas and a private balcony overlooking the sea.',
    description_ar: 'شقة بغرفتي نوم واسعة مع مساحات معيشة كبيرة وشرفة خاصة مطلة على البحر.',
    availability_status: 'available',
    price_starting_from: 135000,
    area_sqm: 120,
    bedrooms: 2,
    bathrooms: 2,
    balconies: 1,
    living_rooms: 1,
    working_rooms: 1,
    floor: '5-18',
    extra_features: ['Master En-suite', 'Storage Room', 'Utility Balcony'],
    created_at: '2024-01-15',
    updated_at: '2024-06-01',
  },
  {
    id: 'u3',
    property_id: '1',
    title_en: 'Type C — 3 Bedroom Penthouse',
    title_ar: 'النوع ج — بنتهاوس 3 غرف نوم',
    style_code: 'TYPE-C',
    brochure_image: floorplan1,
    description_en: 'An exclusive penthouse with three bedrooms, a private terrace, and unmatched panoramic views.',
    description_ar: 'بنتهاوس حصري بثلاث غرف نوم مع تراس خاص وإطلالات بانورامية لا مثيل لها.',
    availability_status: 'reserved',
    price_starting_from: 280000,
    area_sqm: 210,
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    living_rooms: 2,
    working_rooms: 1,
    floor: '19-20',
    extra_features: ['Private Terrace', 'Jacuzzi', 'Double Parking', 'Private Elevator'],
    created_at: '2024-01-15',
    updated_at: '2024-06-01',
  },
  {
    id: 'u4',
    property_id: '2',
    title_en: 'Villa Model A — 4 Bedroom',
    title_ar: 'فيلا نموذج أ — 4 غرف نوم',
    style_code: 'VILLA-A',
    brochure_image: floorplan1,
    description_en: 'A stunning four-bedroom villa with private garden, double garage, and premium finishes throughout.',
    description_ar: 'فيلا مذهلة بأربع غرف نوم مع حديقة خاصة وكراج مزدوج.',
    availability_status: 'available',
    price_starting_from: 320000,
    area_sqm: 350,
    bedrooms: 4,
    bathrooms: 4,
    balconies: 2,
    living_rooms: 2,
    working_rooms: 1,
    floor: 'G+1',
    extra_features: ['Private Garden', 'Double Garage', 'Majlis', 'Storage'],
    created_at: '2023-08-10',
    updated_at: '2024-05-20',
  },
];

// ─── SIMULATED DELAY ─────────────────────────────────────
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ─── API FUNCTIONS ───────────────────────────────────────
export async function getProperties(): Promise<Property[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/buildings?populate=*`);
    if (res.ok) {
      const json: StrapiResponse<StrapiBuilding[]> = await res.json();
      return json.data.map(mapBuildingToProperty);
    }
  } catch (error) {
    console.log('Using mock data - Strapi not available');
  }
  await delay(400);
  return mockProperties;
}

export async function getPropertyBySlug(slug: string): Promise<Property | undefined> {
  try {
    const res = await fetch(`${API_BASE_URL}/buildings?filters[slug][$eq]=${slug}&populate=*`);
    if (res.ok) {
      const json: StrapiResponse<StrapiBuilding[]> = await res.json();
      if (json.data.length > 0) {
        return mapBuildingToProperty(json.data[0]);
      }
    }
  } catch (error) {
    console.log('Using mock data - Strapi not available');
  }
  await delay(300);
  return mockProperties.find((p) => p.slug === slug);
}

export async function getUnitsByProperty(buildingId: string): Promise<Unit[]> {
  try {
    // Fetch property types from the building
    const res = await fetch(`${API_BASE_URL}/properties?filters[building][documentId][$eq]=${buildingId}&populate=*`);
    if (res.ok) {
      const json: StrapiResponse<StrapiProperty[]> = await res.json();
      return json.data.map(prop => mapPropertyToUnit(prop, buildingId));
    }
  } catch (error) {
    console.log('Using mock data - Strapi not available');
  }
  await delay(300);
  return mockUnits.filter((u) => u.property_id === buildingId);
}

function mapPropertyToUnit(prop: StrapiProperty, buildingId: string): Unit {
  return {
    id: prop.documentId || String(prop.id),
    property_id: buildingId,
    title_en: prop.name,
    title_ar: prop.name_ar || prop.name,
    style_code: prop.property_type?.toUpperCase() || 'TYPE',
    brochure_image: getImageUrl(prop.floorplan || prop.image),
    description_en: prop.description || `${prop.bedrooms} bedroom ${prop.property_type} with ${prop.area} sqm`,
    description_ar: prop.description_ar || `${prop.property_type} بـ ${prop.bedrooms} غرف نوم بمساحة ${prop.area} متر مربع`,
    availability_status: prop.property_status || 'available',
    price_starting_from: prop.price || 0,
    area_sqm: prop.area || 0,
    bedrooms: prop.bedrooms || 0,
    bathrooms: prop.bathrooms || 0,
    balconies: prop.balconies || 0,
    living_rooms: prop.living_rooms || 1,
    working_rooms: prop.working_rooms || 0,
    floor: prop.floors ? String(prop.floors) : '1',
        extra_features: [],
    total_units: prop.total_units || 0,
    available_units: prop.available_units || 0,
    created_at: prop.createdAt,
    updated_at: prop.updatedAt,
  };
}

export async function submitInterestForm(inquiry: Inquiry): Promise<{ success: boolean }> {
  try {
    // Build the data object with relations
    const data: Record<string, unknown> = {
      name: inquiry.full_name,
      email: inquiry.email,
      phone: inquiry.phone,
      message: inquiry.message || '',
      preferred_contact: inquiry.preferred_contact_method,
    };

    // Add building relation if provided (property_id = building's documentId)
    if (inquiry.property_id) {
      data.building = { connect: [{ documentId: inquiry.property_id }] };
    }

    // Add property relation if provided (unit_id = property type's documentId)
    if (inquiry.unit_id) {
      data.property = { connect: [{ documentId: inquiry.unit_id }] };
    }

    const res = await fetch(`${API_BASE_URL}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });
    if (res.ok) {
      return { success: true };
    }
    const errorData = await res.json();
    console.error('Inquiry submission failed:', errorData);
  } catch (error) {
    console.log('Using mock submission - Strapi not available');
  }
  await delay(600);
  console.log('Inquiry submitted:', inquiry);
  return { success: true };
}

export { mockProperties, mockUnits };
