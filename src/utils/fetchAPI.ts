import { FieldValues } from "react-hook-form";
import { articleActions } from "../store/articles";
import { userActions } from "../store/user";
import { IArticlesObject } from "../types/interfaces";

const BASE: string = "https://blog-platform.kata.academy/api";

type ArticleAction = ReturnType<typeof articleActions.addArticles>;
type UAction = ReturnType<typeof userActions.addUser>;

export async function fetchArticles(
  dispatch: (action: ArticleAction) => void,
  page: number | null = null,
) {
  try {
    let res: Response;
    if (page) {
      res = await fetch(`${BASE}/articles?limit=5&offset=${(page - 1) * 5}`);
    } else {
      res = await fetch(`${BASE}/articles?limit=5`);
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

export async function newUserSignUp(
  dispatch: (action: UAction) => void,
  info: FieldValues,
) {
  let res: Response;
  const { uname, email, password } = info;
  const newUser = {
    user: {
      username: uname,
      email: email,
      password,
    },
  };
  try {
    res = await fetch(`${BASE}/users`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    if (res.ok) {
      const data = await res.json();
      const token = data.user.token;
      localStorage.setItem("token", token);
      dispatch(
        userActions.addUser({
          uname,
          email,
        }),
      );
    }
  } catch (error) {
    throw new Error("Error registering new user: " + error);
  }
}

export async function userSignIn(
  dispatch: (action: UAction) => void,
  info: FieldValues,
) {
  let res: Response;
  const { email, password } = info;
  const existingUser = {
    user: {
      email: email,
      password,
    },
  };
  try {
    res = await fetch(`${BASE}/users/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(existingUser),
    });
    if (res.ok) {
      const data = await res.json();
      const token = data.user.token;
      localStorage.setItem("token", token);
      dispatch(
        userActions.addUser({
          uname: data.user.username,
          email,
        }),
      );
    }
  } catch (error) {
    throw new Error("Error logging in: " + error);
  }
}

export async function updateProfile(
  dispatch: (action: UAction) => void,
  info: FieldValues,
) {
  let res: Response;
  const { uname, email, password, avatar } = info;
  const updatedUser = {
    user: {
      email: email,
      username: uname,
      password,
      image: avatar,
    },
  };
  const token: string | null = localStorage.getItem("token");
  try {
    if (token) {
      res = await fetch(`${BASE}/user`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (res.ok) {
        const data = await res.json();
        dispatch(
          userActions.addUser({
            uname: data.user.username,
            email,
            avatar: data.user.image,
          }),
        );
      }
    }
  } catch (error) {
    throw new Error("Error registering new user: " + error);
  }
}
