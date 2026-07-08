import { createBrowserRouter, Navigate } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter([
  {
	path: "/",  
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        element: <LoginPage />
      },
      { 
        path: "register",
        element: <RegisterPage />
      },
    ]
  }
]);

export default router;