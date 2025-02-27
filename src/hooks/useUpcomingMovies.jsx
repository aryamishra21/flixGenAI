import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUpcomingMovies } from '../utils/store/moviesSlice';
import { API_OPTIONS } from '../utils/constants';

const useUpcomingMovies = () => {
  const upcomingMovies=useSelector(store=>store.movies.upcomingMovies)

      const dispatch=useDispatch();
      useEffect(()=>{
        !upcomingMovies && getNowPlayingMovies()
      },[])
      const getNowPlayingMovies=async()=>{
        
        const response=await  fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', API_OPTIONS)
        const json=await response.json()
        dispatch(addUpcomingMovies(json?.results))
      }
}

export default useUpcomingMovies