import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";


const store = configureStore({
    reducer:{
        app:apiSlice.reducer
    }
});

export default store;