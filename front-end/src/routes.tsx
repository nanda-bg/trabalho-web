import { createBrowserRouter, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "./store/rootReducer";
import { JSX } from "react";
import Login from "./screens/Authentication/Login/Login";
import SignUp from "./screens/Authentication/SignUp/SignUp";
import Home from "./screens/Home/Home";
import EditProfile from "./screens/EditProfile/EditProfile";
import BookDetails from "./screens/BookDetails/BookDetails";
import FavoriteBooks from "./screens/Favorites/Favorites";
import ReviewsScreen from "./screens/Reviews/ReviewsScreen";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAppSelector((state) => state.authSlice);
  const location = useLocation();

  if (!isAuthenticated) {
    localStorage.setItem("redirectAfterLogin", location.pathname);
    return <Navigate to="/" replace />;
  }

  return children;
}

const router = createBrowserRouter([
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/edit-profile",
    element: (
      <ProtectedRoute>
        <EditProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/book/:id",
    element: (
      <ProtectedRoute>
        <BookDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "/books/favorites",
    element: (
      <ProtectedRoute>
        <FavoriteBooks />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reviews/:id",
    element: (
      <ProtectedRoute>
        <ReviewsScreen />
      </ProtectedRoute>
    ),
  },
]);

export default router;
