import { createSlice } from "@reduxjs/toolkit";

const moviesSlice=createSlice({
    name:'movies',
    initialState:{
        nowPlayingMovies:null,
        popularMovies:null,
        topRatedMovies:null,
        upcomingMovies:null,
        trailerVideo:null,
        moviePageData:null,
        moviePageTrailer:null
    },
    reducers:{
        addNowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies=action.payload
        },
        addPopularMovies:(state,action)=>{
            state.popularMovies=action.payload
        },
        addTopRatedMovies:(state,action)=>{
            state.topRatedMovies=action.payload
        },
        addUpcomingMovies:(state,action)=>{
            state.upcomingMovies=action.payload
        },
        addTrailerVideo:(state,action)=>{
            state.trailerVideo=action.payload
        },
        addMoviePageData:(state,action)=>{
            state.moviePageData=action.payload
        },
        addMoviePageTrailer:(state,action)=>{
            state.moviePageTrailer=action.payload
        },
        clearMoviePageTrailer:(state)=>{
            state.moviePageTrailer=null
        }
    }
})
export const {addNowPlayingMovies,addTrailerVideo,addTopRatedMovies,addUpcomingMovies,addPopularMovies,addMoviePageData,addMoviePageTrailer,clearMoviePageTrailer}=moviesSlice.actions;
export default moviesSlice.reducer;