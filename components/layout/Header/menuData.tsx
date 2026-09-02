type Menu = {
    id: number,
    title: string,
    newTab: boolean,
    path?: string,
    submenu?: Menu[]
}

const menuData: Menu[] = [
    {
        id: 1,
        title: "Beranda",
        newTab: false,
        path: "/",
    },
    {
        id: 2,
        title: "Jadwal Training",
        newTab: false,
        path: "/#features",
    },
    {
        id: 3,
        title: "Berita",
        newTab: false,
        path: "/blog",
    },
    {
        id: 4,
        title: "Layanan Kami",
        newTab: false,
        submenu: [
            {
                id: 41,
                title: "Sertifikasi Kemnaker",
                newTab: false,
                path: "/blog",
            },
            {
                id: 42,
                title: "Sertifikasi BNSP",
                newTab: false,
                path: "/auth/signin",
            },
            {
                id: 43,
                title: "Environmental",
                newTab: false,
                path: "/auth/signup",
            },
            {
                id: 44,
                title: "ISO Series",
                newTab: false,
                path: "/docs",
            },
            {
                id: 45,
                title: "Jasa Konsultasi",
                newTab: false,
                path: "/support",
            },
            {
                id: 46,
                title: "Quality",
                newTab: false,
                path: "/error",
            },
            {
                id: 46,
                title: "Perpanjangan SKP",
                newTab: false,
                path: "/error",
            },
        ],
    },
    {
        id: 4,
        title: "Tentang Kami",
        newTab: false,
        path: "/support",
    },
];

export default menuData;
