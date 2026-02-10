import Image from 'next/image';

import { CategoryBannerProps } from '@/types/category';

export default function CategoryBanner({ 
  title = "XẢ KHO GIÁ SỐC", 
  subtitle = "SỐ LƯỢNG CÓ HẠN",
  image
}: CategoryBannerProps) {
  return (
    <div className="relative w-full h-[250px] md:h-[300px] mb-8 overflow-hidden bg-gradient-to-r from-red-600 to-red-800 text-white flex items-center justify-center ">
      
      {/* Ảnh nền (Nếu có) */}
      {image && (
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover absolute inset-0 z-0 "
        />
      )}

      {/* Nội dung Banner */}
      <div className="text-center z-10 p-6 absolute top-0">
        <h2 className="text-[32px] md:text-4xl font-bold mb-2 uppercase tracking-wide drop-shadow-md">{title}</h2>
        <p className="text-[18px] md:text-xl mb-6 font-light uppercase tracking-widest drop-shadow-sm">{subtitle}</p>
        <button className="cursor-pointer bg-white text-[18px] text-primary font-bold py-2 px-8 rounded-full hover:scale-105 transition-transform shadow-lg uppercase">
          MUA NGAY
        </button>
      </div>
      
      {/* Decor (Ví dụ tem giảm giá) */}
      {/* <div className="absolute top-10 left-20 rotate-[-12deg] border-2 border-yellow-400 text-yellow-400 p-2 text-4xl font-black rounded-lg opacity-30">%</div>
      <div className="absolute bottom-10 right-20 rotate-[12deg] border-2 border-yellow-400 text-yellow-400 p-2 text-4xl font-black rounded-lg opacity-30">%</div> */}
    </div>
  );
}
