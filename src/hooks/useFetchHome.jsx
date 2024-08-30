import axios from "axios";

async function useFetchHome() {
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

    const mediaList = {
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
    };

    return mediaList;
  } catch (error) {
    throw (new Error("Failed to fetch data. Please try again later."), error);
  }
}

export default useFetchHome;
