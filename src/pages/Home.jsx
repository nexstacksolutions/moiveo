import React, { useMemo } from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import ShowcaseGrid from "../components/ShowcaseGrid/ShowcaseGrid";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import ErrorPage from "../pages/Error";
import useFetchHome from "../hooks/useFetchHome";

function Home() {
  const { mediaList, loading, error } = useFetchHome();

  const bannerList = useMemo(() => mediaList.banner, [mediaList.banner]);
  const moviesList = useMemo(() => mediaList.movies, [mediaList.movies]);
  const tvShowsList = useMemo(() => mediaList.tvShows, [mediaList.tvShows]);

  const showcases = [
    { name: "Now Playing", list: moviesList.nowPlaying, mediaType: "movies" },
    { name: "Popular Movies", list: moviesList.popular, mediaType: "movies" },
    {
      name: "Top Rated Movies",
      list: moviesList.topRated,
      mediaType: "movies",
    },
    { name: "Upcoming Movies", list: moviesList.upcoming, mediaType: "movies" },
    { name: "On The Air", list: tvShowsList.onTheAir, mediaType: "tv" },
    { name: "Popular TV Show", list: tvShowsList.popular, mediaType: "tv" },
    {
      name: "Top Rated TV Show",
      list: tvShowsList.topRated,
      mediaType: "tv",
    },
  ];

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage errorMsg={error.msg} />;

  return (
    <main>
      <HeroSection bannerList={bannerList} />
      {showcases.map((showcase) => (
        <ShowcaseGrid
          key={showcase.name}
          showcaseName={showcase.name}
          mediaList={showcase.list}
          mediaType={showcase.mediaType}
        />
      ))}
    </main>
  );
}

export default Home;
