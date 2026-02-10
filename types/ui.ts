import React from "react";

export interface BreadcrumbItem {
    label: string;
    href?: string;
    count?: number; 
}

export interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export interface DropdownProps {
    className?: string;
    title: string;
    children: React.ReactNode;
}
