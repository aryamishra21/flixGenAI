import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../utils/store/store";
import { FaPlay } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { API_OPTIONS } from "../utils/constants";
import { addMoviePageData, addTrailerVideo } from "../utils/store/moviesSlice";
import VideoBackground from "./VideoBackground";
import { Link } from "react-router-dom";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies.nowPlayingMovies);
  const dispatch=useDispatch()
  if (!movies) return null;
  const movie = movies[0];
  return (
    <div className="h-[120vh] w-full relative mt-20 sm:mt-0 ">
      <VideoBackground movieId={movie?.id}/>
      <div className="w-[35%] pt-[25%] sm:pt-[10%] h-[100%] pl-[5%] absolute text-white bg-gradient-to-r from-black ">
        <p className="font-bold text-3xl sm:text-6xl mb-5">{movie.title}</p>
        <p className="font-semibold hidden sm:block">{movie.overview}</p>
        <div className="flex gap-5 my-4">
          <Link to={'/movie?q='+movie?.id} onClick={()=>dispatch(addMoviePageData(movie))}>
          <button className="flex gap-2 py-2 px-4 items-center bg-white text-black rounded-md hover:bg-opacity-80">
            <FaPlay className="size-[1.8rem] py-0.5"/>
            <span className="font-bold ">Play</span>
          </button>
          </Link>
          <Link to={'/movie?q='+movie?.id}>
          <button className="flex gap-2 py-2 w-max px-4 items-center  rounded-md bg-gray-300 bg-opacity-70 hover:bg-gray-400">
            <IoIosInformationCircleOutline className="size-[1.8rem]" />
            <span className="font-bold text-[1rem]">More Info</span>
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
