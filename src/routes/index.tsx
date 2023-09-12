import { createBrowserRouter } from "react-router-dom";
import Logout from "../pages/logout";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Dashboard from "../pages/dashboard";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import ChangePassword from "../pages/user/ChangePassword";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/users/sign_in",
    element: <Signin />,
  },
  {
    path: "/users",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/changepassword",
    element: (
      <ProtectedRoute>
        <ChangePassword />
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: <Home />,
  },
]);

export default router;
