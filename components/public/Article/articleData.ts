import { ArticleCategory } from "@/types/article/articleCategory";

const articleCategoryData: ArticleCategory[] = [
  { name: "berita" },
  { name: "artikel" },
  { name: "kesehatan dan keselamatan" },
  { name: "k3" },
  { name: "training" },
]

const articleData = [
  {
    title: "Inspeksi rutin kran tower bulanan",
    slug: "penemuan-harta-karun-di-monas",
    content: "mana ada yang percaya pas lagi sibuk ngecek sling crane malah nemu peti emas kuno ketimbun beton coran jalanan",
    article_category_id: "1"
  },
  {
    title: "Perawatan mesin genset pabrik",
    slug: "kebakaran-misterius-di-gudang-tua",
    content: "lagi asyik ganti oli genset tiba-tiba asap hitam ngebul parah dari arah lorong belakang padahal ga ada yang main api",
    article_category_id: "2"
  }
];

export { articleCategoryData, articleData };

