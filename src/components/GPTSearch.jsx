import React, { useRef, useState } from 'react'
import { API_OPTIONS, BG_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { lang } from '../utils/languageConstants'
import store from '../utils/store/store'
import { openApiClient } from '../utils/openai'
import { genAI } from '../utils/genai'
import { addGPTMoviesResult } from '../utils/store/gptSlice'
import GPTMovieSuggestions from './GPTMovieSuggestions'

const GPTSearch = () => {
    const language=useSelector(store=>store.config.lang)
    const dispatch=useDispatch()
    const searchText=useRef()
    // console.log(language)
    const [searchView,setSearchView]=useState(false)
    const searchMovieTMDB=async(movie)=>{
      const data=await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1',API_OPTIONS)
      const json=await data.json();
      return json.results;
    }
    const handleSubmit=async(e)=>{
        setSearchView(true)
        e.preventDefault();

        const prompt='Act as a Movie Recommendation system and suggest some movies for the query : '+searchText.current.value+". only give me name of 5 movies, comma separated like the example result given ahead. Example Result: Golmal, Interstellar, agent, friend, suits"
        //open ai
        // const gptResults = await openApiClient.chat.completions.create({
        //     messages: [{ role: 'user', content: prompt }],
        //     // model: 'gpt-4o',
        //     model: 'gpt-3.5-turbo',
        //   });
        // console.log(gptResults)

        //gen ai
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const res = await model.generateContent(prompt);
        const genMovies=res.response.text().split(',')
        // console.log(res.response.text());
        const promiseArray=genMovies.map((movie)=>searchMovieTMDB(movie))   //gives promises [promise,promise,promise,promise,promise] which we have to resolve first to get results
        const tmdbResults=await Promise.all(promiseArray) //resolved 
        console.log(tmdbResults)
        dispatch(addGPTMoviesResult({movieNames:genMovies,movieResults:tmdbResults}))
    }
  return (
    <div style={{backgroundImage:`url(${BG_URL})`,}} className='p-5 min-h-[100vh]'>
          <div className='pt-[10%] flex justify-center'>
        <form className='flex bg-gray-900 p-3 sm:p-5 w-full sm:w-[50rem] rounded-lg gap-4 mt-28 sm:mt-0' onSubmit={(e)=>handleSubmit(e)}>
            <input ref={searchText} type="text" placeholder={lang[language].gptSearchPlaceholder} className='p-3 sm:w-[85%] w-[70%]'/>
            <button className=' text-white p-2 bg-red-500 sm:w-[15%] w-[30%] rounded-lg '>{lang[language].search}</button>
        </form>
          </div>
        <div className='mt-5 px-5'>
          <GPTMovieSuggestions searchView={searchView}/>
        </div>
    </div>
  )
}

export default GPTSearch