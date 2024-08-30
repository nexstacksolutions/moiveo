import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetchSearch(query) {
  const [searchResults, setSearchResults] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPageNo, setTotalPageNo] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = useCallback(async () => {
    if (!query.trim()) return; // Don't fetch if input is empty

    if (pageNo === 1) {
      setLoading(true);
    }

    try {
      const { data } = await axios.get(`/search/multi?include_adult=false`, {
        params: {
          query: query,
          page: pageNo,
          language: "en-US",
        },
      });

      setSearchResults((prev) => [...prev, ...data.results]); // Append new results
      setTotalPageNo(data.total_pages); // Update the total number of pages
    } catch (error) {
      console.error("Error fetching search results:", error);
      throw (new Error("Failed to load search results."), error);
    } finally {
      setLoading(false);
    }
  }, [query, pageNo]);

  const handleScroll = useCallback(() => {
    if (
      !loading &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      pageNo < totalPageNo // Check if there are more pages to load
    ) {
      setPageNo((prev) => prev + 1);
    }
  }, [loading, pageNo, totalPageNo]);

  useEffect(() => {
    setPageNo(1);
    setSearchResults([]);
  }, [query]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { searchResults, loading };
}

export default useFetchSearch;
