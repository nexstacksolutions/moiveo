import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import axios from "axios";
import router from "./routes";
import MediaProvider from "./context/MediaContext";

// Configure axios with API base URL and key
axios.defaults.baseURL = "https://api.themoviedb.org/3";

const apiKey = import.meta.env.VITE_API_KEY;

if (apiKey) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${apiKey}`;
} else {
  console.error("API Key is not set. Please check your environment variables.");
}

// Render the app with routing support
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MediaProvider>
      <RouterProvider router={router} />
    </MediaProvider>
  </StrictMode>
);
