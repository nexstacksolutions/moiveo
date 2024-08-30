import App from "../App";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import useFetchHome from "../hooks/useFetchHome";
import useFetchDetails from "../hooks/useFetchDetails";

// All pages
const Home = lazy(() => import("../pages/Home"));
const ExplorePage = lazy(() => import("../pages/Explore"));
const DetailsPage = lazy(() => import("../pages/Details"));
const SearchPage = lazy(() => import("../pages/Search"));
const ErrorBoundary = lazy(() => import("../pages/Error"));

// Creating routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "/", element: <Home />, loader: useFetchHome },
      { path: "/:explore", element: <ExplorePage /> },
      {
        path: "/:explore/:id",
        element: <DetailsPage />,
        loader: useFetchDetails,
      },
      { path: "/search", element: <SearchPage /> },
    ],
  },
]);

export default router;
