import { CategoryFilterConfig } from "@/types/filter";

export const CATEGORY_FILTERS_CONFIG: CategoryFilterConfig = {
    "gach-da-san-go": [
        {
            id: "price",
            title: "Giá",
            type: "range",
            min: 500000,
            max: 20000000,
            step: 500000,
        },
        {
            id: "brand",
            title: "Thương hiệu",
            type: "checkbox",
            options: [
                { label: "AGL", value: "agl" },
                { label: "Ape", value: "ape" },
                { label: "APE GRUPO", value: "ape-grupo" },
                { label: "BEZ", value: "bez" },
                { label: "BNC", value: "bnc" },
                { label: "Caesar", value: "caesar" },
                { label: "CHAMPION", value: "champion" },
                { label: "DURAGRES", value: "duragres" },
            ]
        },
        {
            id: "space",
            title: "Không gian",
            type: "checkbox",
            options: [
                { label: "Gạch hồ bơi", value: "ho-boi" },
                { label: "Gạch ngoài trời", value: "ngoai-troi" },
                { label: "Gạch phòng bếp", value: "phong-bep" },
                { label: "Gạch phòng khách", value: "phong-khach" },
                { label: "Gạch phòng ngủ", value: "phong-ngu" },
            ]
        },
        {
            id: "material",
            title: "Chất liệu",
            type: "checkbox",
            options: [
                { label: "Ceramic", value: "ceramic" },
                { label: "Đất sét", value: "dat-set" },
                { label: "Gạch Bông", value: "gach-bong" },
                { label: "Gạch Granite", value: "granite" },
                { label: "Gạch Porcelain", value: "porcelain" },
            ]
        },
        {
            id: "size",
            title: "Kích thước (cm)",
            type: "checkbox",
            options: [
                { label: "100X100", value: "100x100" },
                { label: "80X80", value: "80x80" },
                { label: "60X60", value: "60x60" },
                { label: "30X60", value: "30x60" },
            ]
        }
    ],
    "thiet-bi-ve-sinh": [
        {
            id: "price",
            title: "Giá",
            type: "range",
            min: 500000,
            max: 50000000,
        },
        {
            id: "brand",
            title: "Thương hiệu",
            type: "checkbox",
            options: [
                { label: "American Standard", value: "american-standard" },
                { label: "Apollo", value: "apollo" },
                { label: "Caesar", value: "caesar" },
                { label: "COTTO", value: "cotto" },
                { label: "GROHE", value: "grohe" },
                { label: "INAX", value: "inax" },
                { label: "Toto", value: "toto" },
            ]
        },
        {
            id: "smart-features",
            title: "Tính năng thông minh",
            type: "checkbox",
            options: [
                { label: "Nắp Điện Tử", value: "nap-dien-tu" },
                { label: "Nắp Rửa Cơ", value: "nap-rua-co" },
                { label: "Tự Động Hoàn Toàn", value: "tu-dong" },
            ]
        },
        {
            id: "flush-tech",
            title: "Công nghệ xả",
            type: "checkbox",
            options: [
                { label: "Xả Xoáy (Siphonic)", value: "siphonic" },
                { label: "Cyclone", value: "cyclone" },
                { label: "G-Max", value: "g-max" },
            ]
        }
    ]
};
