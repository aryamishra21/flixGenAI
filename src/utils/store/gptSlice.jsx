import { createSlice } from "@reduxjs/toolkit";

const gptSlice=createSlice({
    name:'gptSlice',
    initialState:{
        showGPT:false,
        movieNames:null,
        movieResults:null,
    },
    reducers:{
        toggleGPTSearch:(state)=>{
            state.showGPT=!state.showGPT
        },
        addGPTMoviesResult:(state,action)=>{
            const {movieNames,movieResults}=action.payload
            state.movieNames=movieNames
            state.movieResults=movieResults
        }
    }
})
export const {toggleGPTSearch,addGPTMoviesResult}=gptSlice.actions;
export default gptSlice.reducer;