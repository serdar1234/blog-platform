import { FieldValues } from "react-hook-form";
import { articleActions } from "../store/articles";
import { userActions } from "../store/user";
import { IArticlesObject } from "../types/interfaces";
import axios from "axios";

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

export async function fetchThisArticle(slug: string | null = null) {
  try {
    let res = null;
    if (slug) {
      res = await axios.get(`${BASE}/articles/${slug}`);
    }
    if (res && res.status === 200) {
      return res.data;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error fetching article: " + error.message);
    }
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
      localStorage.setItem("tokenExpiry", String(Date.now() + 864e5));

      dispatch(
        userActions.addUser({
          uname,
          email,
          isLoggedIn: true,
        }),
      );
      return { success: true, message: "" };
    } else if (res.status === 422) {
      const data = await res.json();
      let message: string;
      if (data.errors.username) message = "Username " + data.errors.username;
      else message = "Email " + data.errors.email;
      return { success: false, message };
    }
  } catch {
    return { success: false, message: "Sign in failed" };
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
      localStorage.setItem("tokenExpiry", String(Date.now() + 864e5));

      dispatch(
        userActions.addUser({
          uname: data.user.username,
          email,
          isLoggedIn: true,
          avatar: data.user.image,
        }),
      );
      return { success: true, message: "" };
    } else if (res.status === 422) {
      return { success: false, message: "Invalid data - login failed" };
    }
  } catch {
    return { success: false, message: "Login failed" };
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
        localStorage.setItem("token", data.user.token);
        dispatch(
          userActions.addUser({
            uname: data.user.username,
            email,
            avatar: data.user.image,
            isLoggedIn: true,
          }),
        );
      }
    }
  } catch (error) {
    throw new Error("Error registering new user: " + error);
  }
}

export async function startUp(dispatch: (action: UAction) => void) {
  const tokenExpiry = Number(localStorage.getItem("tokenExpiry"));
  if (tokenExpiry == 0 || tokenExpiry - Date.now() < 0) {
    localStorage.clear();
    dispatch(
      userActions.addUser({
        isLoggedIn: false,
        uname: "",
        email: "",
      }),
    );
    console.log("clean up");
  }
  const token = localStorage.getItem("token");
  try {
    const res: Response = await fetch(`${BASE}/user`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      const token = data.user.token;
      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpiry", String(Date.now() + 864e5));
      console.log("start up");

      dispatch(
        userActions.addUser({
          uname: data.user.username,
          email: data.user.email,
          isLoggedIn: true,
          avatar: data.user.image,
        }),
      );
    }
  } catch {
    console.log("session has expired");
  }
}
