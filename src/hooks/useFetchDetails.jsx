import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetchDetails = (id, mediaType) => {
  const [data, setData] = useState({
    details: null,
    cast: null,
    similar: [],
    recommendations: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [
        detailsResponse,
        castResponse,
        similarResponse,
        recommendationsResponse,
      ] = await Promise.all([
        axios.get(`/${mediaType}/${id}`),
        axios.get(`/${mediaType}/${id}/credits`),
        axios.get(`/${mediaType}/${id}/similar`),
        axios.get(`/${mediaType}/${id}/recommendations`),
      ]);

      setData({
        details: detailsResponse.data,
        cast: castResponse.data,
        similar: similarResponse.data.results,
        recommendations: recommendationsResponse.data.results,
      });
    } catch (error) {
      console.error("Error fetching details:", error);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, [id, mediaType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};

export default useFetchDetails;
