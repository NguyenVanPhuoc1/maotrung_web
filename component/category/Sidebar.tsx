"use client";

import React from 'react';
import { CATEGORY_FILTERS_CONFIG } from '@/constants/filters';
import FilterAccordion from './FilterAccordion';
import CheckboxGroup from './CheckboxGroup';
import PriceRange from './PriceRange';
import { Filter, Search } from 'lucide-react';

interface SidebarProps {
    parentSlug: string;
}

export default function Sidebar({ parentSlug }: SidebarProps) {
    const filters = CATEGORY_FILTERS_CONFIG[parentSlug] || [];

    return (
        <aside className="bg-white border-r border-[#d0d0d0] h-full">
            {/* Sidebar Header */}
            <div className="p-5 border-b border-[#d0d0d0] flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Filter size={20} className="text-[#092F49]" />
                    <h2 className="text-[18px] font-bold text-[#092F49] uppercase tracking-wide">Bộ lọc</h2>
                </div>
            </div>

            {/* Quick Search Item (Optional but nice to have as in screenshot) */}
            <div className="p-5 border-b border-[#d0d0d0] bg-gray-50/30">
                <h3 className="text-[13px] font-bold text-[#092F49] uppercase mb-3">TÌM KIẾM NHANH</h3>
                <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" />
                        <span className="text-[14px] text-red-500 font-bold group-hover:underline uppercase">GIẢM ĐẾN 70%</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="text-[14px] text-[#092F49] font-bold group-hover:underline uppercase">MỚI NHẤT 2026</span>
                    </label>
                </div>
            </div>

            {/* Dynamic Filter Sections */}
            <div className=" divide-y divide-[#d0d0d0]">
                {filters.map((section) => (
                    <FilterAccordion key={section.id} title={section.title}>
                        {section.type === 'range' && section.min !== undefined && section.max !== undefined && (
                            <PriceRange min={section.min} max={section.max} step={section.step} />
                        )}
                        {section.type === 'checkbox' && section.options && (
                            <CheckboxGroup options={section.options} />
                        )}
                    </FilterAccordion>
                ))}
            </div>

            {/* Footer / Clear Filter */}
            <div className="p-5 sticky bottom-0 bg-white border-t border-[#d0d0d0] shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
                <button className="w-full text-gray-500 text-[13px] font-medium hover:text-red-500 transition-colors uppercase flex items-center justify-center gap-2">
                    Thiết lập lại tất cả
                </button>
            </div>
        </aside>
    );
}
