import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice';
import moviesSlice from './moviesSlice'
import GPTSlice from './gptSlice'
import ConfigSlice from './configSlice'

const store=configureStore({
    reducer:{
        user:userSlice,
        movies:moviesSlice,
        GPTSearch:GPTSlice,
        config:ConfigSlice
    }
})
export default store