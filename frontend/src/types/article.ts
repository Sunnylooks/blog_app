export interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  image?: string; // Optional image field for article images
  created_at: string;
  updated_at: string;
  is_published: boolean;
}

export interface ArticleCreate {
  title: string;
  content: string;
  author: string;
  image?: string | File; // Optional image field - can be string (URL) or File object
  is_published: boolean;
}

export interface ArticleUpdate {
  id: number;
  title: string;
  content: string;
  author: string;
  image?: string | File; // Optional image field - can be string (URL) or File object
  is_published: boolean;
}

export interface ArticleStats {
  total_articles: number;
  published_articles: number;
  draft_articles: number;
}
