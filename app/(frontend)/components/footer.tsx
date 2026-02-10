import Image from "next/image";
import Link from "next/link";
import { FOOTER_SECTIONS, CONTACT_INFO, SOCIAL_LINKS } from "@/constants/footer";

export default function Footer() {
    return (
        <footer className="bg-white text-[#092F49] border-t border-gray-100 pt-12">
            <div data-label="container" className="mx-auto max-w-full md:px-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Cột 1: Logo & Thông tin liên lạc */}
                    <div className="space-y-6">
                        <Link href="/">
                            <Image
                                src="/assets/images/logo/logo.png"
                                alt="Mao Trung Home Logo"
                                width={180}
                                height={68}
                                className="object-contain"
                                style={{ width: "auto", height: "auto" }}
                            />
                        </Link>
                        
                        <div className="space-y-4 mt-4">
                            <h3 className="font-bold text-sm tracking-widest uppercase">Thông tin liên lạc</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 flex-shrink-0">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                    </div>
                                    <span className="text-sm text-gray-500 leading-relaxed">
                                        <span className="font-semibold text-[#092F49]">Địa Chỉ:</span> {CONTACT_INFO.address}
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        <span className="font-semibold text-[#092F49]">Điện Thoại:</span> {CONTACT_INFO.phone}
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        <span className="font-semibold text-[#092F49]">Email:</span> {CONTACT_INFO.email}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Cột 2 & 3: Chính sách & Thông tin hữu ích */}
                    {FOOTER_SECTIONS.map((section) => (
                        <div key={section.title} className="space-y-6">
                            <h3 className="font-bold text-sm tracking-widest uppercase">{section.title}</h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-sm text-gray-500 hover:text-[#0C4367] transition-colors duration-200 block">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Cột 4: Kết nối & Chứng nhận */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="font-bold text-sm tracking-widest uppercase">Kết nối với chúng tôi</h3>
                            <div className="flex items-center gap-4">
                                {SOCIAL_LINKS.map((social) => (
                                    <Link key={social.platform} href={social.href} className="hover:opacity-80 transition-opacity">
                                        {/* Fallback to simple circle if icons don't exist, but using Image as requested */}
                                        <Image src={social.icon} alt={social.platform} width={32} height={32} className="object-contain" style={{ width: "auto", height: "auto" }} />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-bold text-sm tracking-widest uppercase">Chứng nhận</h3>
                            <div className="relative w-full h-[65px]">
                                {/* Placeholder for Bo Cong Thuong certificate */}
                                <Image src="/assets/images/bocongthuong.png" alt="Bo Cong Thuong" width={150} height={56} className="object-contain" style={{ width: "auto", height: "auto" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Dòng bản quyền */}
            <div className="border-t border-gray-400 py-6 bg-gray-50/50">
                <div data-label="container" className="mx-auto max-w-full md:px-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full text-center">
                    <p className="text-sm text-secondary">
                        &copy; {new Date().getFullYear()} Mao Trung Home. Tất cả quyền được bảo lưu.
                    </p>
                </div>
            </div>
        </footer>
    );
}
