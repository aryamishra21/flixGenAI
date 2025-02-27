import React, { useEffect } from 'react'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from '../components/MainContainer';
import SecondaryContainer from '../components/SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import { useSelector } from 'react-redux';
import GPTSearch from '../components/GPTSearch';

const BrowsePage = () => {
  const GPTView=useSelector(store=>store.GPTSearch.showGPT)
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  return (
    <div>
      {GPTView?<GPTSearch/>:<><MainContainer/><SecondaryContainer/></>}
    </div>
  )
}

export default BrowsePage