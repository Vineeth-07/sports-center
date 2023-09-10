import { createBrowserRouter, Navigate } from "react-router-dom";
import Logout from "../pages/logout";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Dashboard from "../pages/dashboard";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";

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
    path: "/changepassword",
    element: (
      <ProtectedRoute>
        <Dashboard />
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
