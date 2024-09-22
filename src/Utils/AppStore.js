import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import gptReducer from "./searchSlice";
import configReducer from "./configSlice";

const AppStore = configureStore({
    reducer: {
        user: userReducer,
        movie: movieReducer,
        gpt: gptReducer,
        config: configReducer,
    },
    // middleware and devTools are enabled by default in configureStore
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development mode
});

export default AppStore;
