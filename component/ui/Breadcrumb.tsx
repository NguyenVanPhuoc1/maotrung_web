import Link from 'next/link';
import { ChevronRight,Slash } from 'lucide-react';

import { BreadcrumbProps } from '@/types/ui';

export default function Breadcrumb( { items }: BreadcrumbProps){
    return (
         <nav className="flex items-center text-[14px] text-gray-500 py-4">
            {items.map((item, index) => {
                 const isLast = index === items.length - 1;
                 return (
                    <div key={index} className="flex items-center">
                        {index > 0 && <Slash  className="w-4 h-4 mx-2" />}
                        
                        {item.href && !isLast ? (
                        <Link href={item.href} className="hover:text-primary transition-colors">
                            {item.label}
                        </Link>
                        ) : (
                        <span className={`uppercase ${isLast ? 'font-medium text-primary' : ''}`}>
                            {item.label}
                        </span>
                        )}
                        {item.count !== undefined && (
                        <span className="ml-1 text-gray-400">({item.count.toLocaleString()})</span>
                        )}
                    </div>
                    );
            })}
         </nav>
    )
}