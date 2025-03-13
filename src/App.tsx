import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchArticles } from "./utils/fetchAPI";
import RootLayout from "./pages/RootPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchArticles(dispatch);
  }, [dispatch]);

  return <RootLayout />;
}

export default App;
