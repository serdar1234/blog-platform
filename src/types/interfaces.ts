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

type U = "uname" | "email" | "avatar";
export type UserRequiredFields = Record<Exclude<U, "avatar">, string>; // all are required, -avatar
export type UserType = UserRequiredFields &
  Partial<Record<"avatar", string>> &
  Record<"isLoggedIn", boolean>;

export interface IArticlesObject {
  articles: IArticle[];
  articlesCount: number;
  currentPage?: number;
  loadingError?: null | string;
}

export interface PayloadAction {
  type?: string;
  payload: IArticlesObject;
}

export interface UserAction {
  type?: string;
  payload: UserType;
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
