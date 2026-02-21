"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

import { DropdownProps } from '@/types/ui';

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
    ({ className, title, children, ...props }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const [mounted, setMounted] = useState(false);
        const timeoutRef = useRef<NodeJS.Timeout | null>(null);

        useEffect(() => {
            setMounted(true);
            const handleEsc = (e: KeyboardEvent) => {
                if (e.key === "Escape") setIsOpen(false);
            };
            window.addEventListener("keydown", handleEsc);
            return () => window.removeEventListener("keydown", handleEsc);
        }, []);

        const handleMouseEnter = () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setIsOpen(true);
        };

        const handleMouseLeave = () => {
            timeoutRef.current = setTimeout(() => {
                setIsOpen(false);
            }, 150);
        };

        return (
          <div 
            className={cn("relative inline-block", className)} 
            ref={ref} 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
          >
            <button
              className={cn(
                "flex items-center space-x-2 px-6 py-2.5 bg-[#F6F7F8] text-[#092F49] rounded-full hover:bg-[#092F49] hover:text-white transition-all duration-300 font-medium text-sm cursor-pointer",
                isOpen && "bg-[#092F49] text-white ring-2 ring-[#0C4367]/10",
                className
              )}
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-haspopup="true"
            >
              <span>{title}</span>
              <svg
                className={cn(
                    "w-4 h-4 ml-1 transition-transform duration-300",
                    isOpen && "rotate-180"
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Overlay sử dụng Portal để không bị Header giới hạn */}
            {mounted && isOpen && createPortal(
              <div 
                className="fixed inset-0 bg-black/20 backdrop-blur-[8px] z-[40] animate-in fade-in duration-500"
                style={{ WebkitBackdropFilter: "blur(8px)" }}
                onClick={() => setIsOpen(false)}
                onMouseEnter={() => setIsOpen(false)}
              />,
              document.body
            )}

            {/* Mega Menu Content */}
            <div 
              className={cn(
                "fixed top-[128px] left-1/2 -translate-x-1/2 w-[1200px] max-w-[calc(100vw-2rem)] pt-4 z-[999] opacity-0 invisible transition-all duration-300 ease-out pointer-events-none",
                isOpen && "opacity-100 visible translate-y-0 pointer-events-auto"
              )}
            >
              <div className={cn(
                "bg-white shadow-2xl rounded-2xl p-10 relative z-10 transition-all duration-300",
                isOpen ? "translate-y-0" : "translate-y-2"
              )}>
                {children}
              </div>
            </div>
          </div>
        );
    },
);

Dropdown.displayName = "Dropdown";

export { Dropdown };
