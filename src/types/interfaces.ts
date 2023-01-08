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

export interface IFilters {
  device: string[];
  material: string[];
  color: string[];
}

export interface DeviceCount {
  i_12: number;
  ip_12: number;
  i_13_14: number;
  ip_13: number;
  ip_14: number;
}

export interface MaterialCount {
  recycled: number;
  bamboo: number;
  leather: number;
}

