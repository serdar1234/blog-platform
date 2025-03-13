import { articleActions } from "../store/articles";
import { IArticlesObject } from "../types/interfaces";

const BASE: string = "https://blog-platform.kata.academy";

type ArticleAction = ReturnType<typeof articleActions.addArticles>;

export async function fetchArticles(
  dispatch: (action: ArticleAction) => void,
  page: number | null = null,
) {
  try {
    let res: Response;
    if (page) {
      res = await fetch(
        `${BASE}/api/articles?limit=5&offset=${(page - 1) * 5}`,
      );
    } else {
      res = await fetch(`${BASE}/api/articles?limit=5`);
    }
    if (res.ok) {
      const article: IArticlesObject = await res.json();
      dispatch(articleActions.addArticles(article));

      if (article.articlesCount === 0) {
        return;
      }
    }
  } catch (error) {
    throw new Error("Error fetching articles: " + error);
  }
}
