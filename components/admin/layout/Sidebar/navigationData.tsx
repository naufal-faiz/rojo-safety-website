import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
} from "@/public/icons/index";

export type NavigationData = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navigationData: NavigationData[] = [
  {
    icon: <GridIcon/>,
    name: "Dashboard",
    path: "/admin",
  },
  {
    icon: <CalenderIcon/>,
    name: "SEO",
    path: "/admin/seo-settings",
  },
  {
    icon: <UserCircleIcon/>,
    name: "User Profile",
    path: "/admin/profile",
  },

  {
    name: "Artikel",
    icon: <ListIcon/>,
    subItems: [
      { 
        name: "Artikel", 
        path: "/admin/artikel", 
        pro: false 
      },
      { 
        name: "Buat Artikel", 
        path: "/admin/artikel/create", 
        pro: false 
      },
      { 
        name: "Kelola Kategori", 
        path: "/admin/kategori", 
        pro: false 
      },
    ],
  },
  {
    name: "Training",
    icon: <TableIcon/>,
    subItems: [
      { 
        name: "Kategori", 
        path: "/admin/", 
        pro: false 
      },
      { 
        name: "Jenis Alat", 
        path: "/admin/", 
        pro: false 
      },
      { 
        name: "Jadwal", 
        path: "/admin/", 
        pro: false 
      },
    ],
  },
  {
    name: "Halaman Depan",
    icon: <PageIcon/>,
    subItems: [
      { name: "Blank Page", path: "/blank", pro: false },
      { name: "404 Error", path: "/error-404", pro: false },
    ],
  },
  {
    name: "Iklan",
    icon: <PageIcon/>,
    subItems: [
      { name: "Blank Page", path: "/blank", pro: false },
      { name: "404 Error", path: "/error-404", pro: false },
    ],
  },
];

const othersItems: NavigationData[] = [
  {
    icon: <PieChartIcon/>,
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: "/line-chart", pro: false },
      { name: "Bar Chart", path: "/bar-chart", pro: false },
    ],
  },
  {
    icon: <BoxCubeIcon/>,
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "/alerts", pro: false },
      { name: "Avatar", path: "/avatars", pro: false },
      { name: "Badge", path: "/badge", pro: false },
      { name: "Buttons", path: "/buttons", pro: false },
      { name: "Images", path: "/images", pro: false },
      { name: "Videos", path: "/videos", pro: false },
    ],
  },
  {
    icon: <PlugInIcon/>,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin", pro: false },
      { name: "Sign Up", path: "/signup", pro: false },
    ],
  },
];

export {navigationData, othersItems}