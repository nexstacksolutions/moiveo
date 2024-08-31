import axios from "axios";

const searchLoader = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get("q");

    console.log(query);

    if (!query) return { results: [] };

    const { data } = await axios.get(`/search/multi?include_adult=false`, {
      params: {
        query,
        page: 1,
        language: "en-US",
      },
    });

    return {
      results: data.results || [],
      totalPageNo: data.total_pages,
    };
  } catch (error) {
    throw new Response("Failed to load search results.", { status: 500 });
  }
};

export default searchLoader;
