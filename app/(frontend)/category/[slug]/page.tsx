
import CategoryBanner from '@/component/category/CategoryBanner';
import ProductList from '@/component/category/ProductList';
import Breadcrumb from '@/component/ui/Breadcrumb';
import Sidebar from '@/component/category/Sidebar';
import { NAVIGATION_DATA, MainMenu, NavCategory, NavItem } from '@/constants/navigation';

function getCategoryInfo(slug: string) {
  for (const menu of NAVIGATION_DATA) {
    if (menu.dropdownData) {
        for (const cat of menu.dropdownData) {
            const item = cat.items.find((i) => i.slug === slug);
            if (item) {
                return {
                    title: item.label,
                    parent: menu.title,
                    parentSlug: menu.slug
                };
            }
        }
    } else if (menu.slug === slug) {
        return { title: menu.title, parent: 'Trang chủ', parentSlug: '' };
    }
  }
  return { title: 'Dữ liệu đang cập nhật', parent: 'Sản phẩm', parentSlug: '' };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { title, parent, parentSlug } = getCategoryInfo(slug);
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* 1. Phần Header của Danh mục (Full width border) */}
      <div className="border-b border-gray-200 w-full pb-4 ">
          <div className="mx-auto max-w-full md:px-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full">
            <Breadcrumb 
                items={[
                    { label: 'TRANG CHỦ', href: '/' },
                    { label: parent, href: parentSlug ? `/category/${parentSlug}` : '/', count: 15000 },
                    { label: title, count: 120 }
                ]} 
            />
            <h1 className="text-[32px] font-bold text-[#092F49] uppercase mt-2">{title}</h1>
          </div>
      </div>
 
      {/* 2. Phần Nội dung chính (Có container giới hạn chiều rộng) */}
      <div className="max-w-full md:px-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full mx-auto">
        <div className="flex gap-8">
            {/* Sidebar (3/12) */}
            <div className="w-full lg:w-[280px] shrink-0  hidden lg:block">
                <Sidebar parentSlug={parentSlug} />
            </div>

            {/* Main Content (9/12) */}
            <div className="flex-1 mt-4">
                <CategoryBanner 
                    title={`XẢ KHO GIÁ GỐC`}
                    subtitle="SỐ LƯỢNG CÓ HẠN"
                    image="/assets/images/category_banner.png" 
                />
                
                {/* Product List with Sort & View Toggle */}
                <ProductList />
            </div>
        </div>
      </div>
    </div>
  );
}
