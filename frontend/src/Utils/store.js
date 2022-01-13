import { configureStore } from '@reduxjs/toolkit';
import admin from './adminSlice';

const store = configureStore({
    reducer: {
        "admin": admin.reducer
    }
});

export default store;