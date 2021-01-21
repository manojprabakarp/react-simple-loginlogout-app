import React from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: 'userAuth',
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
});
export const userActions = userSlice.actions;
export const getUser = state => state.auth;
export default configureStore({
    reducer: {
        auth: userSlice.reducer,
    },
});