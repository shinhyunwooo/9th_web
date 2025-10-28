// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootLayout from "./layout/RootLayout";
import ProtectedLayout from "./layout/ProtectedLayout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LpDetail from "./pages/LpDetail";
import MyPage from "./pages/MyPage";
import GoogleUserInformation from "./pages/GoogleUserInformation";
import NotFound from "./pages/NotFound";
import Guard from "./layout/Guard";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/oauth/google", element: <GoogleUserInformation /> },
      { element: <Guard />, children: [{ path: "/lps/:lpId", element: <LpDetail /> }] },
    ],
  },
  { element: <ProtectedLayout />, children: [{ path: "/my", element: <MyPage /> }] },
  { path: "*", element: <NotFound /> },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
