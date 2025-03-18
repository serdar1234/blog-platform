import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchArticles } from "./utils/fetchAPI";
import RootLayout from "./pages/RootPage";
import { startUp } from "./utils/fetchAPI";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    startUp(dispatch);
    fetchArticles(dispatch);
  }, [dispatch]);

  return <RootLayout />;
}

export default App;
