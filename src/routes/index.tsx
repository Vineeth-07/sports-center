import { createBrowserRouter, Navigate } from "react-router-dom";
import Logout from "../pages/logout";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Dashboard from "../pages/dashboard";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import Preferences from "../pages/preferences/Preferences";

const isUserAuthenticated = localStorage.getItem("authToken") !== null;

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
    path: "/preferences",
    element: (
      <ProtectedRoute>
        <Preferences />
      </ProtectedRoute>
    ),
  },

  {
    path: "/",
    element: isUserAuthenticated ? (
      <Navigate to="/dashboard" replace />
    ) : (
      <Home />
    ),
  },
]);

export default router;
