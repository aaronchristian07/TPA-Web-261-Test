import { createBrowserRouter, Navigate } from "react-router";

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
        // element: <LoginPage />
      },
    ]
  }
]);

export default router;