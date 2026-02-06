export interface NavItem {
    label: string;
    slug: string;
}

export interface NavCategory {
    title: string;
    items: NavItem[];
}

export interface MainMenu {
    title: string;
    slug: string;
    dropdownData?: NavCategory[];
}

export const NAVIGATION_DATA: MainMenu[] = [
    {
        title: "GẠCH, ĐÁ & SÀN GỖ",
        slug: "gach-da-san-go",
        dropdownData: [
            {
                title: "LOẠI GẠCH",
                items: [
                    { label: "Lát nền", slug: "lat-nen" },
                    { label: "Ốp tường", slug: "op-tuong" },
                    { label: "Men bóng", slug: "men-bong" },
                    { label: "Thông gió", slug: "thong-gio" },
                    { label: "Trang trí", slug: "trang-tri" },
                ],
            },
            {
                title: "KÍCH THƯỚC",
                items: [
                    { label: "Khổ lớn >120 cm", slug: "kho-lon-120cm" },
                    { label: "80 x 80", slug: "80x80" },
                    { label: "60 x 60", slug: "60x60" },
                    { label: "30 x 30", slug: "30x30" },
                    { label: "20 x 20", slug: "20x20" },
                ],
            },
            {
                title: "BỀ MẶT",
                items: [
                    { label: "Bề mặt bóng", slug: "be-mat-bong" },
                    { label: "Bề mặt mờ", slug: "be-mat-mo" },
                    { label: "Chống thấm nước", slug: "chong-tham-nuoc" },
                    { label: "Chống trơn trượt", slug: "chong-tron-truot" },
                    { label: "Dùng cho hồ bơi", slug: "dung-cho-ho-boi" },
                ],
            },
            {
                title: "VÂN GẠCH",
                items: [
                    { label: "Concrete", slug: "concrete" },
                    { label: "Stone", slug: "stone" },
                    { label: "Terrazzo", slug: "terrazzo" },
                    { label: "Mosaic", slug: "mosaic" },
                ],
            },
            {
                title: "KHÔNG GIAN",
                items: [
                    { label: "Sân vườn", slug: "san-vuon" },
                    { label: "Phòng tắm", slug: "phong-tam" },
                    { label: "Ngoài trời", slug: "ngoai-troi" },
                    { label: "Phòng khách", slug: "phong-khach" },
                ],
            },
            {
                title: "CHẤT LIỆU",
                items: [
                    { label: "Ceramic", slug: "ceramic" },
                    { label: "Kính", slug: "kinh" },
                    { label: "Granite", slug: "granite" },
                    { label: "Porcelain", slug: "porcelain" },
                    { label: "Xi măng", slug: "xi-mang" },
                ],
            },
        ]
    },
    {
        title: "THIẾT BỊ VỆ SINH",
        slug: "thiet-bi-ve-sinh",
        dropdownData: [
            {
                title: "BỒN CẦU",
                items: [
                    { label: "Bồn cầu 1 khối", slug: "bon-cau-1-khoi" },
                    { label: "Bồn cầu 2 khối", slug: "bon-cau-2-khoi" },
                    { label: "Bồn cầu thông minh", slug: "bon-cau-thong-minh" },
                    { label: "Bồn cầu treo tường", slug: "bon-cau-treo-tuong" },
                ],
            },
            {
                title: "LAVABO",
                items: [
                    { label: "Lavabo đặt bàn", slug: "lavabo-dat-ban" },
                    { label: "Lavabo âm bàn", slug: "lavabo-am-ban" },
                    { label: "Lavabo treo tường", slug: "lavabo-treo-tuong" },
                    { label: "Vòi lavabo", slug: "voi-lavabo" },
                ],
            },
            {
                title: "SEN TẮM",
                items: [
                    { label: "Sen cây tắm", slug: "sen-cay-tam" },
                    { label: "Sen tắm âm tường", slug: "sen-tam-am-tuong" },
                    { label: "Củ sen tắm", slug: "cu-sen-tam" },
                    { label: "Bát sen", slug: "bat-sen" },
                ],
            },
            {
                title: "BỒN TẮM",
                items: [
                    { label: "Bồn tắm nằm", slug: "bon-tam-nam" },
                    { label: "Bồn tắm massage", slug: "bon-tam-massage" },
                    { label: "Bồn tắm đứng", slug: "bon-tam-dung" },
                    { label: "Phụ kiện bồn tắm", slug: "phu-kien-bon-tam" },
                ],
            },
            {
                title: "PHỤ KIỆN",
                items: [
                    { label: "Gương soi", slug: "guong-soi" },
                    { label: "Móc treo khăn", slug: "moc-treo-khan" },
                    { label: "Kệ kính", slug: "ke-kinh" },
                    { label: "Thoát sàn", slug: "thoat-san" },
                ],
            },
            {
                title: "HÀNG HIỆU",
                items: [
                    { label: "Toto", slug: "toto" },
                    { label: "Inax", slug: "inax" },
                    { label: "Kohler", slug: "kohler" },
                    { label: "Grohe", slug: "grohe" },
                ],
            },
        ]
    },
    {
        title: "THIẾT BỊ BẾP",
        slug: "thiet-bi-bep",
        dropdownData: [
            {
                title: "BẾP",
                items: [
                    { label: "Bếp từ", slug: "bep-tu" },
                    { label: "Bếp điện từ", slug: "bep-dien-tu" },
                    { label: "Bếp hồng ngoại", slug: "bep-hong-ngoai" },
                    { label: "Bếp gas âm", slug: "bep-gas-am" },
                ],
            },
            {
                title: "MÁY HÚT MÙI",
                items: [
                    { label: "Hút mùi âm tủ", slug: "hut-mui-am-tu" },
                    { label: "Hút mùi kính cong", slug: "hut-mui-kinh-cong" },
                    { label: "Hút mùi độc lập", slug: "hut-mui-doc-lap" },
                ],
            },
            {
                title: "CHẬU VÒI BẾP",
                items: [
                    { label: "Chậu rửa bát inox", slug: "chau-rua-bat-inox" },
                    { label: "Chậu rửa bát đá", slug: "chau-rua-bat-da" },
                    { label: "Vòi rửa bát nóng lạnh", slug: "voi-rua-bat-nong-lanh" },
                ],
            },
            {
                title: "LÒ NƯỚNG",
                items: [
                    { label: "Lò nướng âm tủ", slug: "lo-nuong-am-tu" },
                    { label: "Lò vi sóng âm tủ", slug: "lo-vi-song-am-tu" },
                    { label: "Máy rửa bát", slug: "may-rua-bat" },
                ],
            },
        ]
    },
    {
        title: "GIA DỤNG",
        slug: "gia-dung",
        dropdownData: [
            {
                title: "NẤU ĂN",
                items: [
                    { label: "Nồi cơm điện", slug: "noi-com-dien" },
                    { label: "Nồi chiên không dầu", slug: "noi-chien-khong-dau" },
                    { label: "Bộ nồi chảo", slug: "bo-noi-chao" },
                ],
            },
            {
                title: "ĐIỆN MÁY",
                items: [
                    { label: "Bình nóng lạnh", slug: "binh-nong-lanh" },
                    { label: "Máy lọc nước", slug: "may-loc-nuoc" },
                    { label: "Quạt điện", slug: "quat-dien" },
                ],
            },
            {
                title: "THÔNG MINH",
                items: [
                    { label: "Khóa cửa vân tay", slug: "khoa-cua-van-tay" },
                    { label: "Robot hút bụi", slug: "robot-hut-bui" },
                    { label: "Công tắc thông minh", slug: "cong-tak-thong-minh" },
                ],
            },
        ]
    },
    {
        title: "VẬN CHUYỂN & LẮP ĐẶT",
        slug: "van-chuyen-lap-dat",
    }
];
