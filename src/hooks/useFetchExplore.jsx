import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetchExplore(explore, initialData) {
  const [mediaList, setMediaList] = useState(initialData?.mediaList || []);
  const [pageNo, setPageNo] = useState(2);
  const [totalPageNo, setTotalPageNo] = useState(initialData?.totalPageNo || 0);

  const fetchData = useCallback(async () => {
    if (pageNo > totalPageNo) return;

    try {
      const endpoint = explore === "tv" ? "/discover/tv" : "/discover/movie";
      const response = await axios.get(`${endpoint}?sort_by=popularity.desc`, {
        params: { page: pageNo },
      });

      setMediaList((prev) => [...prev, ...(response.data.results || [])]);
      setPageNo((prev) => prev + 1);
      setTotalPageNo(response.data.total_pages);
    } catch (error) {
      console.error("Failed to load data.", error);
    }
  }, [explore, pageNo, totalPageNo]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      fetchData();
    }
  }, [fetchData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { mediaList };
}

export default useFetchExplore;
