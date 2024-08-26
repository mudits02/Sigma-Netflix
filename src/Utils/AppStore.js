import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const AppStore = configureStore({
    reducer: {
        user: userReducer,
    },
    // middleware and devTools are enabled by default in configureStore
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development mode
});

export default AppStore;
