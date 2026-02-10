import React from "react";
import Image from "next/image";
import { Eye, Heart, Scan, ChevronRight, ShoppingCart } from "lucide-react";
import { ProductCardProps } from "@/types/product";
import Link from "next/link";

export default function ProductCard({
  name,
  price,
  originalPrice,
  discountPercent,
  image,
  brand,
  specs,
  thumbnail = "/assets/images/product/product_2.jpg",
  code = "G38628",
  layout = "grid",
}: ProductCardProps & { code?: string }) {
  const isList = layout === "list";

  return (
    <div
      className={`group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex h-full ${isList ? "flex-col sm:flex-row" : "flex-col"}`}
    >
      {/* 1. IMAGE SECTION (40% in list view) */}
      <div
        className={`relative overflow-hidden ${isList ? "w-full sm:w-[40%] aspect-[5/3] sm:aspect-auto" : "w-full aspect-[5/3]"}`}
      >
        {/* Main Room Scene Image */}
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Brand Badge */}
        <div className="absolute top-0 left-0 bg-white px-3 py-1 text-[8px] font-bold uppercase tracking-wider text-gray-800 shadow-sm z-10">
          {brand}
        </div>
      </div>

      {/* 2. CONTENT WRAPPER (60% in list view) */}
      <div
        className={`${isList ? "w-full sm:w-[60%] flex flex-col" : "w-full flex-1 flex flex-col"}`}
      >
        {/* 2a. INFO SECTION (Thumbnail & Specs) */}
        <div className="p-4 flex gap-4 items-center border-b border-gray-50">
          {/* BÊN TRÁI: Thumbnail */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 border border-gray-100 shadow-sm relative">
              <Image
                src={thumbnail}
                alt="Texture"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-[10px] mt-1 text-gray-500 font-bold uppercase">
              {code}
            </p>
          </div>

          {/* BÊN PHẢI: Specs Grid */}
          <div className="flex-1 grid grid-cols-2 gap-y-2 gap-x-2">
            {specs.slice(0, 4).map((spec, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-gray-400 mt-1 shrink-0">
                  {/* Ép kiểu sang ReactElement có thuộc tính size để tránh lỗi TypeScript */}
                  {React.isValidElement(spec.icon) &&
                    React.cloneElement(
                      spec.icon as React.ReactElement<{
                        size?: number;
                        strokeWidth?: number;
                      }>,
                      {
                        size: 14,
                        strokeWidth: 2,
                      },
                    )}
                </span>

                <div className="flex flex-col">
                  <span className="text-[8px] text-gray-400 leading-tight uppercase">
                    {spec.label}
                  </span>
                  <span className="text-[9px] font-bold text-gray-800 leading-tight uppercase">
                    {spec.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2b. MAIN PRICE & NAME SECTION */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Product Name */}
          <Link
            href={`#`}
            className="text-base font-bold text-[#092F49] hover:text-blue-600 line-clamp-2 mb-3 transition-colors uppercase tracking-tight"
          >
            {name}
          </Link>

          {/* Price Section */}
          <div className="mt-auto space-y-3">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-xl font-extrabold text-[#E31B23]">
                {price.toLocaleString()}đ
                <span className="text-sm font-normal text-gray-500 ml-1">
                  /m²
                </span>
              </span>
              {originalPrice && (
                <span className="text-sm text-gray-400 line-through font-medium">
                  {originalPrice.toLocaleString()}đ
                </span>
              )}
            </div>

            <div className="flex justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                {discountPercent && (
                  <span className="bg-red-50 text-[#E31B23] px-2 py-0.5 rounded text-[10px] font-bold">
                    -{discountPercent}%
                  </span>
                )}
                <div className="flex items-center gap-1 text-gray-400 text-xs font-medium">
                  <Eye size={12} />
                  <span>2.5k</span>
                </div>
              </div>

              <button className="text-[11px] font-bold text-[#092F49] uppercase border-b-2 border-[#092F49] hover:text-blue-600 hover:border-blue-600 transition-all pb-0.5 whitespace-nowrap">
                Nhận báo giá ngay
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-gray-100 mt-4 pt-4 flex justify-end items-center gap-3">
            <Link href="#" className="cursor-pointer flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-all border border-gray-200 rounded-full px-3 py-1 text-xs font-bold hover:bg-red-50">
              <ShoppingCart size={14} />
              <span>Add to cart</span>
            </Link>
            <button className="cursor-pointer flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-all border border-gray-200 rounded-full px-3 py-1 text-xs font-bold hover:bg-red-50">
              <Heart size={14} />
              <span>Yêu thích</span>
            </button>
            <button className="cursor-pointer p-1.5 text-gray-400 hover:text-[#092F49] transition-all border border-gray-200 rounded-full hover:bg-gray-50">
              <Scan size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
