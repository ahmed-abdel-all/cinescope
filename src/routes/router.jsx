import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import AuthLayout from "../components/layout/AuthLayout";

import Home from "../pages/Home";
import Movies from "../pages/Movies";
import MovieDetails from "../pages/MovieDetails";
import SearchResults from "../pages/SearchResults";
import Favorites from "../pages/Favorites";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/common/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "movie/:id",
        element: <MovieDetails />,
      },
      {
        path: "search",
        element: <SearchResults />,
      },
      {
        path: "favorites",
        element: (
            <ProtectedRoute>
            <Favorites />
            </ProtectedRoute>
        ),
      },
      {
    path: "profile",
    element: (
        <ProtectedRoute>
            <Profile />
        </ProtectedRoute>
    )
   }
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
