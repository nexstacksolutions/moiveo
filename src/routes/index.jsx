import App from "../App";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// loaders
import useFetchHome from "../hooks/useFetchHome";
import useFetchDetails from "../hooks/useFetchDetails";
import exploreLoader from "../hooks/loaders/exploreLoader";
import searchLoader from "../hooks/loaders/searchLoader";

// actions
import searchAction from "../hooks/actions/searchAction";

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
      { path: "/:explore", element: <ExplorePage />, loader: exploreLoader },
      {
        path: "/:explore/:id",
        element: <DetailsPage />,
        loader: useFetchDetails,
      },
      {
        path: "/search",
        element: <SearchPage />,
        loader: searchLoader,
        action: searchAction,
      },
    ],
  },
]);

export default router;
