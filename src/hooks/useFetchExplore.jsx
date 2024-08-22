import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetchExplore(explore) {
  const [mediaList, setMediaList] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPageNo, setTotalPageNo] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (pageNo === 1) {
      setLoading(true);
    }

    try {
      const endpoint = explore === "tv" ? "/discover/tv" : "/discover/movie";
      const response = await axios.get(`${endpoint}?sort_by=popularity.desc`, {
        params: { page: pageNo },
      });

      setMediaList((prev) => [...prev, ...(response.data.results || [])]);
      setTotalPageNo(response.data.total_pages);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [explore, pageNo]);

  const handleScroll = useCallback(() => {
    if (
      !loading &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      pageNo < totalPageNo
    ) {
      setPageNo((prev) => prev + 1);
    }
  }, [loading, pageNo, totalPageNo]);

  useEffect(() => {
    setPageNo(1);
    setMediaList([]);
  }, [explore]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { mediaList, loading, error };
}

export default useFetchExplore;
