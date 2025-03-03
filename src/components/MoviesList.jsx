import React from 'react'
import { PosterURL } from '../utils/constants'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addMoviePageData } from '../utils/store/moviesSlice'
import { lang } from '../utils/languageConstants'

const MoviesList = ({title,movies}) => {
  const language=useSelector(store=>store.config.lang)
  console.log(lang[language][title],'lang')
  const dispatch=useDispatch()
    console.log(title,movies)
  return (
    <div className=' w-full text-white relative '>
        {/* <p className='font-semibold text-lg mb-8'>{title}</p> */}
        <p className='font-semibold text-lg mb-8'>{lang[language][title] || title}</p>
        <div className='flex gap-6 overflow-x-scroll w-full noScrollBar mb-5 '>
            {movies?.map((movie)=>movie?.poster_path && <Link onClick={()=>dispatch(addMoviePageData(movie))} className='min-w-[10rem] h-[15rem] overflow-hidden ' to={'/movie?q='+movie.id}><img src={PosterURL+ movie?.poster_path} alt="" className='w-[10rem] h-full  hover:scale-[1.2] transition-all duration-300 object-cover' /></Link>)}
        </div>
    </div>
  )
}

// {lang[language].search}
export default MoviesList