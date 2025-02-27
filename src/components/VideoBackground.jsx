import React from 'react'
import useMovieTrailer from '../hooks/useMovieTrailer'
import { useSelector } from 'react-redux';

const VideoBackground = ({movieId}) => {
  const trailerData = useSelector((store) => store.movies.trailerVideo);
  //gets movie trailer video and sets it to trailervideo in moviesSlice
    useMovieTrailer({movieId})
  return (
    <div className="w-full h-full absolute ">
    <iframe
    className="w-full h-full "
      src={"https://www.youtube.com/embed/" + trailerData?.key+ '?autoplay=1&loop=1&mute=1&controls=0&rel=0&playlist='+trailerData?.key}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  </div>
  )
}

export default VideoBackground