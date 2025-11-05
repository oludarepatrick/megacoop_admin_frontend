import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import PageLoader from "./components/PageLoader";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import AuthProtectedRoute from "./components/layout/AuthProtectedRoute";
import Transactions from "./pages/Transactions";

const LoginPage = lazy(() => import("./pages/auth/Login"));
const AccessCodePage = lazy(() => import("./pages/auth/AccessCode"));
const DashboardPage = lazy(() => import("./pages/Dashboard"));
const KYCPage = lazy(() => import("./pages/KYC"));
const NotFound = lazy(() => import("./pages/NotFound"));

export const routes = createBrowserRouter([
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  { 
    path: "/login", 
    element: (
      <Suspense fallback={<PageLoader />}>
        <LoginPage />
      </Suspense>
    )
  },
  {
    path: "/",
    element: <AuthProtectedRoute />,
    children: [
      {
        path: "access-code",
        element: (
          <Suspense fallback={<PageLoader />}>
            <AccessCodePage />
          </Suspense>
        )
      },
    ]
  },
  {
    path: "/",
    element: <ProtectedRoute/>,
    children: [
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<PageLoader />}>
            <DashboardPage />
          </Suspense>
        )
      },
      {
        path: "kyc", 
        element: (
          <Suspense fallback={<PageLoader />}>
            <KYCPage />
          </Suspense>
        )
      },
      {
        path: "transactions", 
        element: (
          <Suspense fallback={<PageLoader />}>
            <Transactions />
          </Suspense>
        )
      },
      // Add more protected routes here
    ]
  },
  { 
    path: "*", 
    element: (
      <Suspense fallback={<PageLoader />}>
        <NotFound />
      </Suspense>
    )
  }
]);
