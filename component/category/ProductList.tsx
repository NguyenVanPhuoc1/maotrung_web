"use client";

import { useState } from "react";
import ProductCard from "@/component/product/ProductCard";
import SortBar from "./SortBar";
import { ProductSpec } from "@/types/product";

import { Ruler, Layers, Gem, Palette } from "lucide-react";

// Mock Data for demonstration
const TILE_SPECS: ProductSpec[] = [
    { label: 'Kích thước', value: '60x60 cm', icon: <Ruler size={16} /> },
    { label: 'Bề mặt', value: 'Matt', icon: <Layers size={16} /> },
    { label: 'Chất liệu', value: 'Porcelain', icon: <Gem size={16} /> },
    { label: 'Vân & Màu', value: 'Xám khói', icon: <Palette size={16} /> },
];

export default function ProductList() {
  const [cols, setCols] = useState<3 | 1>(3);

  // Generate 12 dummy products
  const products = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Gạch Lát Nền Cao Cấp Mã ${i + 1}`,
    price: 350000 + (i * 10000),
    originalPrice: 450000 + (i * 10000),
    image: "/assets/images/product/product_1.jpg", 
    specs: TILE_SPECS
  }));

  return (
    <div>
      <SortBar 
        totalResults={products.length} 
        currentCols={cols}
        onViewChange={setCols}
      />

  <div className={`grid gap-6 ${cols === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {products.map((product) => (
            <ProductCard 
                key={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                discountPercent={20}
                brand="VIGLACERA"
                image={product.image}
                specs={product.specs}
                layout={cols === 1 ? 'list' : 'grid'}
            />
        ))}
      </div>
    </div>
  );
}
