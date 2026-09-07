export type Author = {
  name: string;
  image: string;
  bio?: string;
  _id?: number | string;
  _ref?: number | string;
};

export type Article = {
  _id: number;
  title: string;
  slug?: any;
  metadata?: string;
  body?: string;
  mainImage?: any;
  author?: Author;
  tags?: string[];
  publishedAt?: string;
  type: string
};

export type ArticleMaster = {
  id: number;
  category_id: number
  seo_id: number
  title: string
  slug: string
  excerpt: string
  thumbnail: string
  content: Text
  views: number
  status: "publish" | "draft" | "archived"
  created_at: Date
  published_at: Date
  updated_at: Date
  deleted_at: Date
}