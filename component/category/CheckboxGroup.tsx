"use client";

import React, { useState } from 'react';
import { FilterOption } from '@/types/filter';
import { Check } from 'lucide-react';

interface CheckboxGroupProps {
    options: FilterOption[];
    maxDisplay?: number;
}

export default function CheckboxGroup({ options, maxDisplay = 8 }: CheckboxGroupProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const visibleOptions = isExpanded ? options : options.slice(0, maxDisplay);

    const toggleOption = (value: string) => {
        setSelectedValues(prev => 
            prev.includes(value) 
                ? prev.filter(v => v !== value) 
                : [...prev, value]
        );
    };

    return (
        <div className="space-y-2.5">
            {visibleOptions.map((option) => (
                <label 
                    key={option.value} 
                    className="flex items-center justify-between cursor-pointer group"
                >
                    <div className="flex items-center gap-3">
                        <div className="relative flex items-center justify-center">
                            <input 
                                type="checkbox"
                                checked={selectedValues.includes(option.value)}
                                onChange={() => toggleOption(option.value)}
                                className="appearance-none w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-[#092F49] checked:border-[#092F49] transition-all cursor-pointer"
                            />
                            {selectedValues.includes(option.value) && (
                                <Check size={14} className="text-white absolute pointer-events-none" />
                            )}
                        </div>
                        <span className={`text-[14px] transition-colors ${selectedValues.includes(option.value) ? 'text-[#092F49] font-medium' : 'text-gray-600 group-hover:text-gray-900 uppercase'}`}>
                            {option.label}
                        </span>
                    </div>
                    {option.count !== undefined && (
                        <span className="text-[12px] text-gray-400">({option.count.toLocaleString()})</span>
                    )}
                </label>
            ))}

            {options.length > maxDisplay && (
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-blue-600 text-[14px] font-medium hover:underline pt-2 inline-block"
                >
                    {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                </button>
            )}
        </div>
    );
}
