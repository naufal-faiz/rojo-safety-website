export type CompanyService = {
    id: number
    icon: string
    title: string
    description: string
}

const servicesData: CompanyService[] = [
    {
        id: 1,
        icon: "/images/icon/icon-01.svg",
        title: "SERTIFIKASI",
        description:
            "Perbarui dengan mudah perpanjangan SKP dan Lisensi Kemnaker RI bersama layanan terpercaya kami",
    },
    {
        id: 2,
        icon: "/images/icon/icon-02.svg",
        title: "SMK3",
        description:
            "Dorong produktivitas dan keamanan di perusahaan Anda dengan layanan konsultan SMK3 dari Rojo Safety",
    },
    {
        id: 3,
        icon: "/images/icon/icon-03.svg",
        title: "UJI RIKSA",
        description:
            "Optimalkan perlindungan tenaga kerja dengan melakukan uji riksa peralatan dengan layanan unggulan kami",
    },
    {
        id: 4,
        icon: "/images/icon/icon-04.svg",
        title: "INHOUSE TRAINING",
        description:
            "Bergabunglah bersama kami dalam pelatihan K3 terbaik yang dirancang khusus baik untuk In House dan Publik Training",
    },
    {
        id: 5,
        icon: "/images/icon/icon-05.svg",
        title: "KONSULTAN",
        description:
            "pengalaman lebih dari 7+ tahun dalam memberikan dukungan kepada perusahaan di berbagai industri",
    },
    {
        id: 6,
        icon: "/images/icon/icon-06.svg",
        title: "E-COURSE",
        description:
            "Tingkatkan pengetahuan dan kuasai kompetensi sebagai HSE Officer terkait teknis pelaksanaan K3 di lapangan",
    },
];

export default servicesData;
