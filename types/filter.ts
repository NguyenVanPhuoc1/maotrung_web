export type FilterType = 'checkbox' | 'range' | 'radio';

export interface FilterOption {
    label: string;
    value: string;
    count?: number;
}

export interface FilterSection {
    id: string;
    title: string;
    type: FilterType;
    options?: FilterOption[];
    min?: number; // Cho loại 'range'
    max?: number; // Cho loại 'range'
    step?: number; // Cho loại 'range'
}

export interface CategoryFilterConfig {
    [parentSlug: string]: FilterSection[];
}
