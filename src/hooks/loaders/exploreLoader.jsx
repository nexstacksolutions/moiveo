import axios from "axios";

const exploreLoader = async ({ params }) => {
  try {
    const { explore } = params;

    if (explore !== "movies" && explore !== "tv") {
      throw new Response(`Error: No route matches URL "${explore}"`, {
        status: 404,
        statusText: "Not Found",
      });
    }

    const endpoint = explore === "tv" ? "/discover/tv" : "/discover/movie";
    const response = await axios.get(`${endpoint}?sort_by=popularity.desc`, {
      params: { page: 1 },
    });

    return {
      mediaList: response.data.results || [],
      totalPageNo: response.data.total_pages,
    };
  } catch (error) {
    throw new Response("Failed to load data.", { status: 500 });
  }
};

export default exploreLoader;
