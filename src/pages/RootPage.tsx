import { Routes, Route } from "react-router";
import Main from "../components/Main";
import CardList from "../components/CardList";

const Root: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<CardList />} />
        {/* <Route index element={<h2>test2</h2>} /> */}
      </Route>
    </Routes>
  );
};

export default Root;
