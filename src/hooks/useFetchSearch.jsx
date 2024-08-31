import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetchSearch(query, initialData) {
  const [searchResults, setSearchResults] = useState(
    initialData?.results || []
  );
  const [pageNo, setPageNo] = useState(2);
  const [totalPageNo, setTotalPageNo] = useState(initialData?.totalPageNo || 0);

  const fetchSearchResults = useCallback(async () => {
    if (!query.trim() || pageNo > totalPageNo) return;

    try {
      const { data } = await axios.get(`/search/multi?include_adult=false`, {
        params: {
          query: query,
          page: pageNo,
          language: "en-US",
        },
      });

      setSearchResults((prev) => [...prev, ...data.results]);
      setPageNo((prev) => prev + 1);
      setTotalPageNo(data.total_pages);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }, [query, pageNo, totalPageNo]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      fetchSearchResults();
    }
  }, [fetchSearchResults]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { searchResults };
}

export default useFetchSearch;
