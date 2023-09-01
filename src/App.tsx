import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { MatchesProvider } from "./context/matches/context";
import { ArticlesProvider } from "./context/articles/context";

const App = () => {
  return (
    <div>
      <ArticlesProvider>
        <MatchesProvider>
          <RouterProvider router={router} />
        </MatchesProvider>
      </ArticlesProvider>
    </div>
  );
};
export default App;
