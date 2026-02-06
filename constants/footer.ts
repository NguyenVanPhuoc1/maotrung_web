export interface FooterLink {
    label: string;
    href: string;
}

export interface FooterSection {
    title: string;
    links: FooterLink[];
}

export const FOOTER_SECTIONS: FooterSection[] = [
    {
        title: "Chính sách",
        links: [
            { label: "Giao hàng, nhận hàng", href: "/chinh-sach/giao-hang" },
            { label: "Bảo hành", href: "/chinh-sach/bao-hanh" },
            { label: "Đổi trả hàng", href: "/chinh-sach/doi-tra" },
            { label: "Bảo mật thông tin", href: "/chinh-sach/bao-mat" },
        ],
    },
    {
        title: "Thông tin hữu ích",
        links: [
            { label: "Về Chúng Tôi", href: "/ve-chung-toi" },
            { label: "Hồ Sơ Năng Lực", href: "/ho-so-nang-luc" },
            { label: "Dự Án Tiêu Biểu", href: "/du-an" },
            { label: "Blog", href: "/blog" },
        ],
    },
];

export const CONTACT_INFO = {
    address: "291 Tô Hiến Thành, P.13, Q10, TP.HCM",
    phone: "0903.572.468",
    email: "chamsoc@maotrung.com",
};

export const SOCIAL_LINKS = [
    { platform: "facebook", href: "#", icon: "/assets/images/fb.png" },
    { platform: "zalo", href: "#", icon: "/assets/images/zalo.png" },
    { platform: "youtube", href: "#", icon: "/assets/images/ytb.png" },
    { platform: "tiktok", href: "#", icon: "/assets/images/tiktok.png" },
];
