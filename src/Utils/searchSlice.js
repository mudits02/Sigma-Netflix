import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'gpt',
    initialState: {
        showSearch: false,
        movieName: null,
        movieResults: null,
    },

    reducers: {
        toggleSearchView: (state) => {
            state.showSearch = !state.showSearch;
        },
        addGptMovieResult: (state, action) => {
            const {movieName , movieResults} = action.payload;
            state.movieName = movieName;
            state.movieResults = movieResults;
        }
    }
})

export const {toggleSearchView , addGptMovieResult} = searchSlice.actions;
export default searchSlice.reducer;