"use client";

import { LayoutGrid, List, Calculator, Grid2X2 } from "lucide-react";

interface SortBarProps {
  totalResults: number;
  onViewChange: (cols: 3 | 1) => void;
  currentCols: 3 | 1;
}

export default function SortBar({ totalResults, onViewChange, currentCols }: SortBarProps) {
  return (
    <div className="mb-6">
      {/* Top Bar: Tools & Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        
        {/* Left: Area Calculator */}
        <div className="flex items-center gap-2 w-full md:w-auto">
             <div className="relative flex-1 md:flex-none">
                <input 
                    type="text" 
                    placeholder="DIỆN TÍCH" 
                    className="pl-4 pr-10 py-2.5 border border-gray-200 rounded text-sm w-full md:w-40 focus:outline-none focus:border-[#092F49] text-[#092F49] placeholder-gray-400 font-medium"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-bold">M²</span>
             </div>
             
             <button className="flex items-center gap-2 bg-[#092F49] text-white px-5 py-2.5 rounded hover:bg-[#0b3c5d] transition-colors text-sm font-bold whitespace-nowrap shadow-sm">
                <Calculator size={16} />
                TÍNH GIÁ
             </button>
        </div>

        {/* Right: Sort & View Options */}
        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end ">
             {/* Sort Dropdown - Pill Style */}
             <div className="relative group">
                <select className=" text-[14px] appearance-none bg-white border border-gray-200 text-[#092F49] text-base font-semibold py-2 pl-4 pr-10 rounded-full cursor-pointer hover:border-[#092F49] focus:outline-none focus:ring-1 focus:ring-[#092F49] transition-all shadow-sm">
                    <option>BÁN CHẠY</option>
                    <option>GIÁ THẤP</option>
                    <option>GIÁ CAO</option>
                    <option>TÊN A-Z</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center px-1 text-[#092F49]">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
             </div>
             
             <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

             {/* View Toggles - Segmented Control Style */}
             <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden divide-x divide-gray-200 shadow-sm bg-white ">
                <button 
                    onClick={() => onViewChange(3)}
                    className={`p-2 cursor-pointer transition-colors ${currentCols === 3 ? 'text-[#092F49] bg-gray-50' : 'text-gray-400 hover:text-[#092F49] hover:bg-gray-50'}`}
                    title="Xem lưới"
                >
                    <LayoutGrid size={16} strokeWidth={currentCols === 3 ? 2.5 : 2} />
                </button>
                
                <button 
                    onClick={() => onViewChange(1)}
                    className={`p-2 cursor-pointer transition-colors ${currentCols === 1 ? 'text-[#092F49] bg-gray-50' : 'text-gray-400 hover:text-[#092F49] hover:bg-gray-50'}`}
                    title="Xem danh sách"
                >
                     <List size={16} strokeWidth={currentCols === 1 ? 2.5 : 2} />
                </button>
             </div>
        </div>
      </div>
      
      {/* Total Results Text */}
      <div className="text-[#092F49] uppercase font-medium text-lg tracking-wide border-b border-gray-100 pb-2">
        {totalResults} KẾT QUẢ
      </div>
    </div>
  );
}
