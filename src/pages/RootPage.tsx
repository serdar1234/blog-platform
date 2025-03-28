import { Routes, Route } from "react-router";
import Main from "../components/Main";
import CardList from "../components/CardList";
import Article from "../components/Article";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import Profile from "../components/Profile";
import NewArticle from "../components/NewArticle";
import { ProtectedRoute } from "./ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "../types/interfaces";

const Root: React.FC = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<CardList />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="articles" element={<CardList />} />
        <Route path="/articles/:slug" element={<Article />} />
        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route
            path="/articles/:slug/edit"
            element={<NewArticle editMode={true} />}
          />
          <Route path="/new-article" element={<NewArticle />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Root;
