export interface RootState {
  articles: IArticlesObject;
}
export interface IAuthor {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface IArticle {
  slug: string;
  title: string;
  content: string;
  description: string;
  body: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: IAuthor;
}

export interface IArticleProps {
  info: IArticle;
}

export interface IArticlesObject {
  articles: IArticle[];
  articlesCount: number;
}

export interface PayloadAction {
  type?: string;
  payload: IArticlesObject;
}

export interface RootState {
  articles: IArticlesObject; // This reflects your Redux store's shape.
}
