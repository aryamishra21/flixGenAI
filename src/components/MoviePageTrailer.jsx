import React from 'react'
import { useSelector } from 'react-redux';
import useMoviePageVideo from '../hooks/useMoviePageVideo';

const MoviePageTrailer = ({movieId}) => {
    console.log('trail',movieId)
    const moviePageTrailer = useSelector((store) => store.movies.moviePageTrailer);
    useMoviePageVideo({movieId});
    console.log('distrail',moviePageTrailer);
    if (!moviePageTrailer) return;
  return (
              <div className="w-[100%] h-[50vh] md:[60vh] lg:h-[100vh] xl:h-[80vh] mx-auto mt-24">
        <iframe
          className="w-full h-full "
          src={
            "https://www.youtube.com/embed/" +
            moviePageTrailer?.key 
            +
            "?autoplay=1&loop=1&mute=0&controls=0&rel=0&playlist=" +
            moviePageTrailer?.key
          }
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
  )
}

export default MoviePageTrailer