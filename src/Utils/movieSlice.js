import { createSlice } from "@reduxjs/toolkit";


const movieSlice = createSlice({
    name: "movie",
    initialState: {
        nowPlayingMovies: null,
        videoTrailer: null,
        popularMovies: null,
        topRatedMovies: null,
        upcomingMovies: null,
        horrorMovies: null,
    },
    reducers: {
        addNowPlayingMovies: (state , action) =>{
            state.nowPlayingMovies = action.payload;
        },
        addVideoTrailer: (state , action) => {
            state.videoTrailer = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        addTopRatedMovies: (state , action) => {
            state.topRatedMovies = action.payload;
        }, 
        addUpcomingMovies: (state , action) => {
            state.upcomingMovies = action.payload;
        },
        addHorrorMovies: (state , action) => {
            state.horrorMovies = action.payload;
        }
    }
})

export const {addNowPlayingMovies , addVideoTrailer , addPopularMovies , addTopRatedMovies , addUpcomingMovies , addHorrorMovies} = movieSlice.actions;

export default movieSlice.reducer;