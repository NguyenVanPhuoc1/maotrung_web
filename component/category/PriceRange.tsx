"use client";

import React, { useState, useEffect, useRef } from 'react';

interface PriceRangeProps {
    min: number;
    max: number;
    step?: number;
}

export default function PriceRange({ min, max, step = 500000 }: PriceRangeProps) {
    const [minValue, setMinValue] = useState(min);
    const [maxValue, setMaxValue] = useState(max);
    
    const minRef = useRef<HTMLInputElement>(null);
    const maxRef = useRef<HTMLInputElement>(null);
    const rangeRef = useRef<HTMLDivElement>(null);

    // Chuyển đổi giá trị sang phần trăm để vẽ thanh bar
    const getPercent = (value: number) => Math.round(((value - min) / (max - min)) * 100);

    // Cập nhật thanh màu giữa 2 thumb
    useEffect(() => {
        if (maxRef.current && minRef.current && rangeRef.current) {
            const minPercent = getPercent(minValue);
            const maxPercent = getPercent(maxValue);

            rangeRef.current.style.left = `${minPercent}%`;
            rangeRef.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minValue, maxValue]);

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target.value), maxValue - step);
        setMinValue(value);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), minValue + step);
        setMaxValue(value);
    };

    return (
        <div className="space-y-8 pt-2 pb-2">
            {/* Thanh trượt 2 đầu */}
            <div className="relative w-full h-2 bg-gray-200 rounded-full mt-2">
                {/* Thanh màu nằm giữa 2 point (Active Range) - Đổi sang màu Cam để nổi bật */}
                <div 
                    ref={rangeRef}
                    className="absolute h-full bg-primary rounded-full  transition-all duration-150"
                />

                {/* Input Range cho Min */}
                <input
                    ref={minRef}
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={minValue}
                    onChange={handleMinChange}
                    className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none z-30 cursor-pointer 
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:active:scale-125"
                />

                {/* Input Range cho Max */}
                <input
                    ref={maxRef}
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={maxValue}
                    onChange={handleMaxChange}
                    className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none z-30 cursor-pointer 
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:active:scale-125"
                />
            </div>

            {/* Hiển thị giá và Input */}
            <div className="grid grid-cols-2 gap-3 items-center">
                <div className="space-y-1">
                    <label className="text-[11px] text-gray-400 uppercase font-bold">Từ (VNĐ)</label>
                    <div className="relative">
                        <input 
                            type="text" 
                            value={minValue.toLocaleString()}
                            className="w-full border border-gray-200 rounded-md py-2 px-3 text-[14px] font-bold text-[#092F49] outline-none bg-gray-50"
                            readOnly
                        />
                         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-gray-400">đ</span>
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-[11px] text-gray-400 uppercase font-bold">Đến (VNĐ)</label>
                    <div className="relative">
                        <input 
                            type="text" 
                            value={maxValue.toLocaleString()}
                            className="w-full border border-gray-200 rounded-md py-2 px-3 text-[14px] font-bold text-[#092F49] outline-none bg-gray-50"
                            readOnly
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-gray-400">đ</span>
                    </div>
                </div>
            </div>
            
            <button className="w-full bg-[#092F49] text-white py-2.5 rounded-md text-[14px] font-bold hover:bg-[#0d3d5f] transition-all transform active:scale-[0.98] shadow-sm">
                ÁP DỤNG LỌC GIÁ
            </button>
        </div>
    );
}
