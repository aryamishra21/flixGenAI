import React from 'react'
import { useSelector } from 'react-redux'
import MoviesList from './MoviesList'
import Shimmer from './Shimmer'

//searchview is to check if search button is clicked to show shimmer only then
const GPTMovieSuggestions = ({searchView}) => {
    const {movieNames,movieResults}=useSelector(store=>store.GPTSearch)
    // console.log(movieNames,movieResults ,'sugg')
    if(!movieNames && searchView) return <Shimmer/>;
    else if(!movieNames) return null;
  return (
    <div className='bg-gray-800 opacity-95 p-4 rounded-sm'>
        {movieNames.map((movie,index)=><MoviesList key={movie} title={movie} movies={movieResults?.[index]}/>)}
    </div>
  )
}

export default GPTMovieSuggestions