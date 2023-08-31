import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { MatchesProvider } from "./context/matches/context";

const App = () => {
  return (
    <div>
      <MatchesProvider>
        <RouterProvider router={router} />
      </MatchesProvider>
    </div>
  );
};
export default App;
