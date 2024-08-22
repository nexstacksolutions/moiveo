import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetchVideo(endpoint) {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVideo = useCallback(async (endpoint) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(endpoint);

      setMediaList(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideo(endpoint);
  }, [fetchVideo, endpoint]);

  return { mediaList, loading, error };
}

export default useFetchVideo;
