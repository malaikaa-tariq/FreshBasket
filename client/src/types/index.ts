export type UserRole = 'user' | 'admin';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  unit: string;
  stock: number;
  featured: boolean;
  category: Category | string;
  averageRating?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  _id: string;
  items: CartItem[];
  subtotal: number;
}

export interface OrderItem {
  product: string | Product;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'packed' | 'out-for-delivery' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  paymentMethod: 'cash-on-delivery' | 'card';
  createdAt: string;
}
