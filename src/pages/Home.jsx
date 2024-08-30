import React, { useMemo } from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import ShowcaseGrid from "../components/ShowcaseGrid/ShowcaseGrid";
import { useLoaderData } from "react-router-dom";

function Home() {
  const mediaList = useLoaderData();

  const bannerList = useMemo(() => mediaList.banner, [mediaList.banner]);
  const moviesList = useMemo(() => mediaList.movies, [mediaList.movies]);
  const tvShowsList = useMemo(() => mediaList.tvShows, [mediaList.tvShows]);

  const showcases = [
    { name: "Now Playing", list: moviesList.nowPlaying, mediaType: "movie" },
    { name: "Popular Movies", list: moviesList.popular, mediaType: "movie" },
    {
      name: "Top Rated Movies",
      list: moviesList.topRated,
      mediaType: "movie",
    },
    { name: "Upcoming Movies", list: moviesList.upcoming, mediaType: "movie" },
    { name: "On The Air", list: tvShowsList.onTheAir, mediaType: "tv" },
    { name: "Popular TV Show", list: tvShowsList.popular, mediaType: "tv" },
    {
      name: "Top Rated TV Show",
      list: tvShowsList.topRated,
      mediaType: "tv",
    },
  ];

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
