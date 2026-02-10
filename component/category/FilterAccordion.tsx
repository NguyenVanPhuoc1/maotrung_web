"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FilterAccordionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    badgeCount?: number;
}

export default function FilterAccordion({ 
    title, 
    children, 
    defaultOpen = true,
    badgeCount
}: FilterAccordionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-[#d0d0d0] last:border-0 py-4">
            <div className="px-5">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between w-full text-left group cursor-pointer"
                >
                    <div className="flex items-center gap-2 ">
                        <span className="text-[15px] font-bold text-[#092F49] uppercase tracking-wide group-hover:text-blue-600 transition-colors">
                            {title}
                        </span>
                        {badgeCount !== undefined && badgeCount > 0 && (
                            <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                                {badgeCount}
                            </span>
                        )}
                    </div>
                    {isOpen ? (
                        <ChevronUp size={20} className="text-gray-400 group-hover:text-[#092F49]" />
                    ) : (
                        <ChevronDown size={20} className="text-gray-400 group-hover:text-[#092F49]" />
                    )}
                </button>
                
                {isOpen && (
                    <div className="mt-4 animate-in fade-in slide-in-from-top-1 duration-200">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}
