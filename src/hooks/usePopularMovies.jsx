import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addPopularMovies, addTopRatedMovies } from '../utils/store/moviesSlice';
import { API_OPTIONS } from '../utils/constants';

const usePopularMovies = () => {
  const popularMovies=useSelector(store=>store.movies.popularMovies)
      const dispatch=useDispatch();
      useEffect(()=>{
       !popularMovies && getNowPlayingMovies()
      },[])
      const getNowPlayingMovies=async()=>{
        
        const response=await  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_OPTIONS)
        const json=await response.json()
        dispatch(addPopularMovies(json?.results))
      }
}

export default usePopularMovies