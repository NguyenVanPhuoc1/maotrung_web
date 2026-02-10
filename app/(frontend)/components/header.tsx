"use client";

import Image from "next/image";
import { Input } from "@/component/ui/input";
import { Dropdown } from "@/component/ui/dropdown";
import Link from "next/link";
import { useState, useEffect } from "react";
import { NAVIGATION_DATA, NavCategory, NavItem, MainMenu } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { http } from "@/lib/api-client";

export default function Header() {
    const [scrollY, setScrollY] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [categories, setCategories] = useState<MainMenu[]>(NAVIGATION_DATA);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Lấy root categories (parent/0)
                const response: any = await http.get('site/productcategories/parent/0');
                const rootItems = response.items || [];

                // Chạy đồng thời các API lấy danh mục con cho từng root
                const childrenResults = await Promise.all(
                    rootItems.map((item: any) =>
                        http.get<any>(`site/productcategories/parent/${item.id}`)
                            .then(res => ({
                                parentId: item.id,
                                children: res.items || []
                            }))
                            .catch(() => ({
                                parentId: item.id,
                                children: []
                            }))
                    )
                );

                // Map dữ liệu vào cấu trúc MainMenu
                const mappedCategories: MainMenu[] = rootItems.map((item: any) => {
                    const mockup = NAVIGATION_DATA.find(nav => nav.slug === item.seo_url);
                    const apiChildren = childrenResults.find(res => res.parentId === item.id)?.children || [];

                    // Tạo NavCategory từ API children
                    const apiNavCategory: NavCategory | null = apiChildren.length > 0 ? {
                        title: "Dòng sản phẩm",
                        items: apiChildren.map((child: any) => ({
                            label: child.name,
                            slug: child.seo_url
                        }))
                    } : null;

                    const finalDropdownData: NavCategory[] = [];
                    if (apiNavCategory) {
                        finalDropdownData.push(apiNavCategory);
                    }

                    // Mockup data
                    // if (mockup?.dropdownData) {
                    //     finalDropdownData.push(...mockup.dropdownData);
                    // }

                    return {
                        title: item.name.toUpperCase(),
                        slug: item.seo_url,
                        dropdownData: finalDropdownData.length > 0 ? finalDropdownData : undefined
                    };
                });

                setCategories(mappedCategories);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
                setCategories(NAVIGATION_DATA);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMenuOpen]);

    const isSticky = scrollY >= 200;

    return (
      <>
        {/* Mobile Drawer Overlay */}
        <div 
            className={cn(
                "fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300 lg:hidden",
                isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
            onClick={() => setIsMenuOpen(false)}
        />

        {/* Mobile Drawer (Sidebar) */}
        <div 
            className={cn(
                "fixed top-0 left-0 h-full w-[360px] bg-white z-[101] shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col",
                isMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}
        >
            {/* Drawer Header */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <Image
                        src="/assets/images/logo/logo.png"
                        alt="Logo"
                        width={120}
                        height={45}
                        className="object-contain"
                    />
                </Link>
                <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-gray-400 hover:text-[#092F49]"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto bg-white">
                <div className="p-4 space-y-6">

                    {categories.map((menu: MainMenu) => (
                        <div key={menu.slug} className="space-y-3">
                            {menu.dropdownData ? (
                                <>
                                    <button 
                                        onClick={() => toggleMenu(menu.slug)}
                                        className="flex items-center justify-between w-full p-3 bg-gray-50/50 rounded-xl text-[#092F49] font-bold text-sm uppercase tracking-wide group"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="w-1 h-4 bg-[#092F49] rounded-full"></div>
                                            {menu.title}
                                        </div>
                                        <svg 
                                            className={cn(
                                                "w-5 h-5 transition-transform duration-300 text-gray-400",
                                                openMenus[menu.slug] && "rotate-180 text-[#092F49]"
                                            )} 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    
                                    <div className={cn(
                                        "overflow-hidden transition-all duration-300 ease-in-out pl-3",
                                        openMenus[menu.slug] ? "max-h-[1000px] opacity-100 mt-2 pb-2" : "max-h-0 opacity-0"
                                    )}>
                                        <div className="space-y-4 pt-2 border-l-2 border-gray-100 ml-0.5 pl-4">
                                            {menu.dropdownData.map((category: NavCategory) => (
                                                <div key={category.title} className="space-y-2">
                                                    <h4 className="font-bold text-gray-800 text-[13px] uppercase tracking-wider">{category.title}</h4>
                                                    <ul className="grid grid-cols-1 gap-1">
                                                        {category.items.map((item: NavItem) => (
                                                            <li key={item.slug}>
                                                                <Link 
                                                                    href={`/category/${item.slug}`}
                                                                    onClick={() => setIsMenuOpen(false)}
                                                                    className="text-gray-500 hover:text-[#092F49] text-[13px] py-1.5 block transition-colors flex items-center gap-2"
                                                                >
                                                                    <span className="w-1 h-1 bg-gray-300 rounded-full group-hover:bg-[#092F49]"></span>
                                                                    {item.label}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <Link
                                    href={`/${menu.slug}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-2 p-3 bg-gray-50/50 rounded-xl text-[#092F49] font-bold text-sm hover:bg-gray-100 transition-colors uppercase tracking-wide"
                                >
                                    <span className="w-1.5 h-1.5 bg-[#092F49] rounded-full"></span>
                                    {menu.title}
                                </Link>
                            )}
                        </div>
                    ))}
                    
                    {/* Additional Links for Mobile */}
                    <div className="pt-6 border-t border-gray-100 space-y-3">
                        <Link href="/" className="flex items-center gap-3 text-gray-600 text-[13px] hover:text-[#092F49] py-2 px-1">
                            <span className="text-lg">📘</span> Cẩm Nang Xây Dựng
                        </Link>
                        <Link href="/" className="flex items-center gap-3 text-gray-600 text-[13px] hover:text-[#092F49] py-2 px-1">
                            <span className="text-lg">📍</span> Showroom HCM
                        </Link>
                    </div>
                </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-4">
                <Link 
                    href="/login" 
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full py-3 bg-[#092F49] text-white rounded-xl font-bold text-center block text-sm shadow-lg shadow-[#092F4920]"
                >
                    ĐĂNG NHẬP
                </Link>
                <div className="text-center text-[11px] text-gray-400">
                    Hotline: <span className="font-bold text-[#092F49]">090.xxx.xxxx</span>
                </div>
            </div>
        </div>

        {/* Placeholder để giữ chỗ cho nội dung bên dưới */}
        <div className="h-[128px] w-full" />
        
        <header 
          className={cn(
              "bg-white w-full z-50 fixed top-0 left-0 right-0",
              isSticky ? "shadow-2xl translate-y-0 transition-all duration-500 ease-out" : "transition-none"
          )}
          style={{
            transform: !isSticky ? `translateY(${-scrollY}px)` : "translateY(0)"
          }}
        >
        {/* Desktop Header */}
        <div className="hidden lg:block">
          <div data-label="container" className="mx-auto max-w-full md:px-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Image
                  src="/assets/images/logo/logo.png"
                  alt="Logo"
                  width={145}
                  height={55}
                />
              </div>
              <div className="flex-search flex flex-col items-center lg:min-w-130 relative">
                <Image
                  src="/assets/images/search_icon.svg"
                  alt="Search"
                  width={20}
                  height={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                />
                <Input
                  placeholder="SỐ 1 VỀ GẠCH, HƠN 10000 MẪU GẠCH"
                  className="pl-14 pr-12"
                />
                <Image
                  src="/assets/images/camera.svg"
                  alt="Search"
                  width={20}
                  height={20}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
                />
              </div>
              <nav className="flex space-x-8">
                <Link
                  href="/cart"
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-sm"
                >
                  <Image
                    src="/assets/images/cart-icon.svg"
                    alt="Cart"
                    width={16}
                    height={16}
                  />
                  <span>GIỎ HÀNG</span>
                </Link>

                <Link
                  href="/wishlist"
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-sm"
                >
                  <Image
                    src="/assets/images/heart-icon.svg"
                    alt="Wishlist"
                    width={16}
                    height={16}
                  />
                  <span>YÊU THÍCH</span>
                </Link>

                <Link
                  href="/profile"
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-sm"
                >
                  <Image
                    src="/assets/images/user.svg"
                    alt="Profile"
                    width={16}
                    height={16}
                  />
                  <span>HỒ SƠ</span>
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="block lg:hidden">
          <div data-label="container" className="mx-auto px-4 py-2 space-y-3">
            {/* Top Row: Menu - Logo - Cart */}
            <div className="flex justify-between items-center h-12">
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="p-2 -ml-2 text-[#092F49] hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <Link href="/">
                <Image
                  src="/assets/images/logo/logo.png"
                  alt="Logo"
                  width={120}
                  height={45}
                  className="object-contain"
                />
              </Link>

              <Link href="/cart" className="relative p-2 -mr-2">
                <Image
                  src="/assets/images/cart-icon.svg"
                  alt="Cart"
                  width={24}
                  height={24}
                />
              </Link>
            </div>

            {/* Bottom Row: Search Bar */}
            <div className="relative w-full">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 border-r pr-3 border-gray-200 z-10">
                <span className="text-sm text-gray-400">Tìm kiếm</span>
                <Image
                  src="/assets/images/search_icon.svg"
                  alt="Search"
                  width={18}
                  height={18}
                />
              </div>
              <Input
                placeholder="Tìm kiếm bằng hình ảnh"
                className="pl-28 pr-12 h-11 rounded-full border-[#0C4367] placeholder:text-gray-600 placeholder:text-sm"
              />
              <Image
                src="/assets/images/camera.svg"
                alt="Search"
                width={20}
                height={20}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div data-label="container" className="mx-auto max-w-full md:px-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full hidden lg:block">
          <div className="flex justify-between items-center">
            <div className="flex items-center h-16 space-x-4">
              {categories.map((menu: MainMenu) => (
                menu.dropdownData ? (
                  <Dropdown key={menu.slug} title={menu.title}>
                    <div className="flex gap-12 w-full">
                      {/* Columns of Links */}
                      <div className={cn(
                        "grid gap-8 flex-1",
                        menu.gridCols === 1 && "grid-cols-1",
                        menu.gridCols === 2 && "grid-cols-2",
                        menu.gridCols === 3 && "grid-cols-3",
                        menu.gridCols === 4 && "grid-cols-4",
                        menu.gridCols === 5 && "grid-cols-5",
                        menu.gridCols === 6 && "grid-cols-6",
                        !menu.gridCols && "grid-cols-6" // Mặc định là 6 nếu không có
                      )}>
                        {menu.dropdownData.map((category: NavCategory) => (
                          <div key={category.title} className="space-y-4">
                            <h3 className="font-bold text-[#092F49] text-sm tracking-widest border-b pb-2 uppercase">{category.title}</h3>
                            <ul className="space-y-2">
                              {category.items.map((item: NavItem) => (
                                <li key={item.slug}>
                                  <Link 
                                      href={`/category/${item.slug}`} 
                                      className="text-gray-500 hover:text-[#0C4367] text-sm transition-colors duration-200 block"
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Images Section (Can be customized per menu later) */}
                      <div className="w-60 space-y-4 border-l pl-8 hidden xl:block">
                        <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
                          <Image 
                            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop" 
                            alt="Category Preview" 
                            fill 
                            className="object-cover transition-transform duration-500 group-hover:scale-105" 
                          />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                        </div>
                        <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
                          <Image 
                            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop" 
                            alt="Product Preview" 
                            fill 
                            className="object-cover transition-transform duration-500 group-hover:scale-105" 
                          />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                        </div>
                      </div>
                    </div>
                  </Dropdown>
                ) : (
                  <Link
                    key={menu.slug}
                    href={`/${menu.slug}`}
                    className="px-6 py-2.5 bg-[#F6F7F8] text-[#092F49] rounded-full hover:bg-[#092F49] hover:text-white transition-all duration-300 font-medium text-sm whitespace-nowrap"
                  >
                    {menu.title}
                  </Link>
                )
              ))}
            </div>
            <div className="flex items-center h-16 space-x-4">
              <Link href="/" className="px-6 py-2.5 bg-[#F6F7F8] text-[#092F49] rounded-full hover:bg-[#092F49] hover:text-white transition-all duration-300 font-medium text-sm whitespace-nowrap uppercase">Cẩm Nang Xây Dựng</Link>
              <div className="relative group">
                {/* Promo Badge */}
                <div className="absolute -top-4 -right-13 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 z-10 rotate-[5deg] group-hover:animate-ring whitespace-nowrap transition-transform duration-300">
                   <span className="text-xs">🎁</span>
                   <span>GHÉ LÀ CÓ QUÀ</span>
                   {/* Triangle pointer */}
                   <div className="absolute -bottom-1 left-4 w-2 h-2 bg-red-600 rotate-45"></div>
                </div>

                {/* Showroom Button */}
                <Link href="/" className="flex flex-col items-center justify-center px-6 py-1.5 bg-[#F6F7F8] text-[#082E47] rounded-full hover:bg-[#092F49] hover:text-white transition-all duration-300 leading-tight">
                  <span className="font-bold text-xs uppercase">Showroom Hcm</span>
                  <span className="text-[10px] font-medium opacity-80 italic">8:00 - 21:00</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
