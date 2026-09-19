import {
  CalenderIcon,
  GridIcon,
  ListIcon,
  PageIcon,
  TimeIcon,
  UserCircleIcon,
  VideoIcon,
  ShootingStarIcon
} from "@/public/icons/index";

export type NavigationData = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navigationData: NavigationData[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/admin",
  },
  {
    name: "Kegiatan",
    icon: <CalenderIcon />,
    subItems: [
      {
        name: "Jadwal Training",
        path: "/admin/training/jadwal",
        pro: false
      },
      {
        name: "Pendaftaran",
        path: "/admin/training/pendaftaran",
        pro: false
      }
    ]
  },
  {
    name: "Training",
    icon: <ShootingStarIcon />,
    subItems: [
      {
        name: "Jenis Training",
        path: "/admin/training",
        pro: false
      },
      {
        name: "Kategori",
        path: "/admin/training/kategori-training",
        pro: false
      },
      {
        name: "Jenis Alat",
        path: "/admin/training/jenis-alat",
        pro: false
      },
    ],
  },
  {
    name: "Artikel",
    icon: <ListIcon />,
    subItems: [
      {
        name: "Artikel",
        path: "/admin/artikel",
        pro: false
      },
      {
        name: "Kategori",
        path: "/admin/artikel/kategori-artikel",
        pro: false
      },
    ],
  },

  {
    name: "Iklan",
    icon: <VideoIcon />,
    subItems: [
      { name: "Iklan", path: "/admin/iklan", pro: false },
      { name: "Buat iklan", path: "/admin/iklan/create", pro: false },
    ],
  },
  {
    name: "SEO",
    icon: <CalenderIcon />,
    path: "/admin/seo-settings",
  },
];

const othersItems: NavigationData[] = [
  {
    icon: <UserCircleIcon />,
    name: "User Profile",
    path: "/admin/profile",
  },
  {
    name: "Halaman Depan",
    icon: <PageIcon />,
    path: "/admin/landing-page"
  },
  {
    name: "Aktivitas Terbaru",
    icon: <TimeIcon />,
    subItems: [
      { name: "Baru Dihapus", path: "/blank", pro: false },
      // { name: "Kategori Artikel", path: "/error-404", pro: false },
      // { name: "Training", path: "/error-404", pro: false },
      // { name: "Kategori Artikel", path: "/error-404", pro: false },
    ],
  },
];

export { navigationData, othersItems }