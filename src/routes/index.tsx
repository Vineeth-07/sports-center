import { createBrowserRouter, Navigate } from "react-router-dom";
import Logout from "../pages/logout";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Dashboard from "../pages/dashboard";

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
    path: "/",
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
