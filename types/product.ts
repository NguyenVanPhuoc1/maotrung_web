import { ReactNode } from 'react';

// Định nghĩa kiểu dữ liệu cho thông số kỹ thuật động
export interface ProductSpec {
  label: string; 
  value: string; 
  icon?: ReactNode; 
}

export interface ProductCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  image: string; 
  brand: string; 
  specs: ProductSpec[]; 
  thumbnail?: string; 
  layout?: 'grid' | 'list';
}
