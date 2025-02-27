import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import VideoBackground from "../components/VideoBackground";
import useMoviePageVideo from "../hooks/useMoviePageVideo";
import MoviePageTrailer from "../components/MoviePageTrailer";
import { PosterURL } from "../utils/constants";

const MoviePage = () => {
    const [searchParams] = useSearchParams();
    // console.log('param',searchParams.get('q'))
    // const movieId=searchParams.get('q')
    
  const {moviePageData} = useSelector((store) => store.movies);
//   console.log(moviePageData,moviePageTrailer);
  if (!moviePageData) return;
  return (
    <div className="w-full lg:h-[100vh] flex text-white relative bg-gray-900 justify-between mt-20 sm:mt-10 lg:mt-0">
      <div className="absolute w-[100%] lg:w-[50%] h-[100vh] lg:h-[100vh] xl:h-[80vh]  top-24 opacity-85 ">
      {moviePageData?.backdrop_path &&  <img className="w-full h-full object-cover" src={PosterURL+moviePageData?.backdrop_path} alt="poster" />}
      </div>
      <div className="flex h-full lg:h-[80%] w-full flex-col lg:flex-row">

      <div className="lg:w-[50%] h-[100vh] w-full px-2 lg:px-10 z-10 bg-gradient-to-b from-black to-gray-800/30 lg:h-full  mt-24 pt-5">
      {moviePageData?.poster_path &&  <img className="w-[10rem]" src={PosterURL+moviePageData?.poster_path} alt="poster" />}
        <div className="flex gap-5 items-center mt-5">
        <p className="font-bold text-lg">{moviePageData?.release_date.split('-')[0]}</p>
        <p className="font-bold text-lg">{moviePageData?.vote_average}</p>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" className="w-[3rem]" alt="IMDB RATING" />
          </div>
        <p className="font-bold text-xl md:text-4xl my-4">{moviePageData?.title}</p>
        <p className="font-semibold md:text-lg text-sm">{moviePageData?.overview}</p>
      </div>
      <div className="w-full lg:w-[50%] mt-0 sm:mt-20 lg:mt-0 h-full">
        <MoviePageTrailer movieId={searchParams.get('q')}/>
      </div>
      </div>
    </div>
  );
};

export default MoviePage;


// {
//   "adult": false,
//   "backdrop_path": "/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg",
//   "genre_ids": [
//       18,
//       80
//   ],
//   "id": 278,
//   "original_language": "en",
//   "original_title": "The Shawshank Redemption",
//   "overview": "Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
//   "popularity": 72.639,
//   "poster_path": "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
//   "release_date": "1994-09-23",
//   "title": "The Shawshank Redemption",
//   "video": false,
//   "vote_average": 8.708,
//   "vote_count": 27772
// }