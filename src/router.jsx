import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "./pages/login/Page";
import DashboardPage from "./pages/dashboard/Page";
import RegistrationPage from './pages/registration/Page';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/dashboard"} />,
  },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [{ path: "", element: <DashboardPage /> }],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/registration",
    element: <RegistrationPage />,
  },
]);

export default router;
