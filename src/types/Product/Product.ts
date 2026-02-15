export interface Product {
  id: number;
  title: string;
  slug: string;
  category: string;
  image: string;
  description: string;
  features: string[];
  affiliateLink: string;
  price: number;
  originalPrice?: number;
  featured?: boolean;
  rating?: number;
  reviews?: number;
}
