import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetchHome() {
  const [mediaList, setMediaList] = useState({
    banner: [],
    movies: {},
    tvShows: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const [
        { data: bannerData },
        { data: nowPlayingData },
        { data: topRatedData },
        { data: popularMoviesData },
        { data: upcomingData },
        { data: onTheAirData },
        { data: popularTvData },
        { data: topRatedTvData },
      ] = await Promise.all([
        axios.get("/trending/all/week"),
        axios.get("/movie/now_playing?language=en-US&page=1"),
        axios.get("/movie/top_rated?language=en-US&page=1"),
        axios.get("/movie/popular?language=en-US&page=1"),
        axios.get("/movie/upcoming?language=en-US&page=1"),
        axios.get("/tv/on_the_air?language=en-US&page=1"),
        axios.get("/tv/popular?language=en-US&page=1"),
        axios.get("/tv/top_rated?language=en-US&page=1"),
      ]);

      setMediaList({
        banner: bannerData.results,
        movies: {
          nowPlaying: nowPlayingData.results,
          topRated: topRatedData.results,
          popular: popularMoviesData.results,
          upcoming: upcomingData.results,
        },
        tvShows: {
          onTheAir: onTheAirData.results,
          popular: popularTvData.results,
          topRated: topRatedTvData.results,
        },
      });
    } catch (error) {
      console.error("Error fetching media data:", error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  return { mediaList, loading, error };
}

export default useFetchHome;
