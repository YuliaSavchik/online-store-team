//Interface for product cards

export interface Product {
  id: number;
  name: string;
  description: string;
  device: string;
  material: string;
  color: string;
  rating: number;
  stock: number;
  price: number;
  mainImage: string;
  image_1: string;
  image_2: string;
  initialQuality: number;
  stockForCart: number;
  priceForCart: number;
}
