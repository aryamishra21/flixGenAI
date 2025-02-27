import React from 'react'
import { useSelector } from 'react-redux'
import MoviesList from './MoviesList';
const SecondaryContainer = () => {
  const moviesData=useSelector(store=>store.movies);
  if (!moviesData) return null;
  return (
    <div className='bg-black pb-10'>
    <div className='-mt-60 relative pl-14 pr-3 z-10  w-full'>
      <MoviesList title={"Now Playing"} movies={moviesData?.nowPlayingMovies} key={moviesData?.id}/>
      <MoviesList title={"Top Rated"} movies={moviesData?.topRatedMovies} key={moviesData?.id}/>
      <MoviesList title={"Popular"} movies={moviesData?.popularMovies} key={moviesData?.id}/>
      <MoviesList title={"Upcoming"} movies={moviesData?.upcomingMovies} key={moviesData?.id}/>
    </div>
    </div>
  )
}

export default SecondaryContainer