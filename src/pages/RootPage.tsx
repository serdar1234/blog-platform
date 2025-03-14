import { Routes, Route } from "react-router";
import Main from "../components/Main";
import CardList from "../components/CardList";
import Article from "../components/Article";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";

const Root: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<CardList />} />
        <Route path="articles" element={<CardList />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route
          path="/articles/:slug"
          element={<Article />}
          // errorElement={<h1>sdfsfsdf</h1>}
        />
      </Route>
    </Routes>
  );
};

export default Root;
