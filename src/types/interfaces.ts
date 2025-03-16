import {
  FieldErrors,
  UseFormRegister,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

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
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: IAuthor;
}

export interface IArticleProps {
  info: IArticle;
  type?: string | null;
}

type U = "username" | "email" | "password" | "avatar";
export type UserType = Record<U, string>;

export interface IArticlesObject {
  articles: IArticle[];
  articlesCount: number;
}

export interface PayloadAction {
  type?: string;
  payload: IArticlesObject;
}

export interface RootState {
  articles: IArticlesObject;
  user: UserType;
}

export interface InputFieldProps {
  label: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  placeholder: string;
  errors?: FieldErrors<FieldValues>;
  rules?: RegisterOptions<FieldValues>;
  [key: string]: unknown;
}
