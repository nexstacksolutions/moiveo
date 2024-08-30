import axios from "axios";

// Configure axios with API base URL and key
axios.defaults.baseURL = "https://api.themoviedb.org/3";

const apiKey = import.meta.env.VITE_API_KEY;

if (apiKey) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${apiKey}`;
} else {
  console.error("API Key is not set. Please check your environment variables.");
}
