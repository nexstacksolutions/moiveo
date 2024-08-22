import App from "../App";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// All pages
const Home = lazy(() => import("../pages/Home"));
const ExplorePage = lazy(() => import("../pages/Explore"));
const DetailsPage = lazy(() => import("../pages/Details"));
const SearchPage = lazy(() => import("../pages/Search"));

// Creating routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/:explore", element: <ExplorePage /> },
      { path: "/:explore/:id", element: <DetailsPage /> },
      { path: "/search", element: <SearchPage /> },
    ],
  },
]);

export default router;
