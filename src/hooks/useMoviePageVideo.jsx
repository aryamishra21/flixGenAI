import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addMoviePageTrailer, clearMoviePageTrailer } from '../utils/store/moviesSlice';

const useMoviePageVideo = ({movieId}) => {
    console.log('mov',movieId)
    const dispatch=useDispatch();
    const getTrailer=async()=>{
        if (!movieId) {
            return;
          }
                const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          API_OPTIONS
        );
        const json = await response?.json();
        const filterData = json?.results?.filter((res) => res?.type === "Trailer");
        const trailer = filterData ? filterData[0] : json?.results?.[0];
        console.log(trailer,'data fetched')
        dispatch(addMoviePageTrailer(trailer))
    }
    useEffect(()=>{
        getTrailer()
        return () => {
            dispatch(clearMoviePageTrailer()); // Cleanup on unmount
          };
    },[movieId])
}

export default useMoviePageVideo