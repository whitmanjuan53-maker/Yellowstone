export interface FloorPlan {
  id: string;
  name: string;
  code: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  price: number;
  availability: number;
  image: string;
  features: string[];
}

export interface Property {
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  zipCode: string;
  address: string;
  geoCoordinates: {
    lat: number;
    lng: number;
  };
  heroImage: string;
  gallery: string[];
  matterportUrl?: string;
  description: string;
  shortDescription: string;
  priceRange: {
    min: number;
    max: number;
  };
  availabilityStatus: 'available' | 'limited' | 'waitlist';
  amenities: string[];
  tags: string[];
  featured: boolean;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  floorPlans: FloorPlan[];
}

export type Page = 'home' | 'properties' | 'property-detail' | 'map' | 'compare' | 'floor-plans';

export interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page, propertySlug?: string) => void;
}
