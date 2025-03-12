import { articleActions } from "../store/articles";
import { IArticlesObject } from "../types/interfaces";

type ArticleAction = ReturnType<typeof articleActions.addArticles>;

export async function fetchArticles(
  dispatch: (action: ArticleAction) => void,
  page: number | null = null,
) {
  try {
    let res: Response;
    if (page) {
      res = await fetch(
        `https://blog-platform.kata.academy/api/articles?limit=5&offset=${(page - 1) * 5}`,
        { cache: "reload" },
      );
    } else {
      res = await fetch(
        `https://blog-platform.kata.academy/api/articles?limit=5`,
        { cache: "reload" },
      );
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
