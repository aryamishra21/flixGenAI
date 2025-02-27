import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTopRatedMovies } from '../utils/store/moviesSlice';
import { API_OPTIONS } from '../utils/constants';

const useTopRatedMovies = () => {
  const topRatedMovies=useSelector(store=>store.movies.topRatedMovies)

      const dispatch=useDispatch();
      useEffect(()=>{
        !topRatedMovies && getNowPlayingMovies()
      },[])
      const getNowPlayingMovies=async()=>{
        
        const response=await  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', API_OPTIONS)
        const json=await response.json()
        dispatch(addTopRatedMovies(json?.results))
      }
}

export default useTopRatedMovies