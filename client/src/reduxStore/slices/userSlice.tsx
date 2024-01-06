/* Handles user state throughout application */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/User";
import axios from 'axios';


interface UserState {
    user: User | null,
    error: string | null
}


const initalState: UserState = {
    user: null,
    error: null
}


export const loginUser = createAsyncThunk<User, any>('user/loginUser', async (data: any, thunkAPI: any) => {
    try {

        const user = await axios.post(`http://localhost:5000/api/auth/login`, {username: data.username, password:data.password});

        localStorage.setItem('user', JSON.stringify(user));

        return user.data;


    } catch (err:any) {
        console.log("Logging error...");
        return thunkAPI.rejectWithValue({error: err.response?.data?.ErrorMessage || 'An Error has Occured'});

    }
});



export const userSlice = createSlice({
    name: 'user',
    initialState: initalState,
    reducers: {

    },
    extraReducers: (builder => {
        //handle cases for when user logs in.
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });

        builder.addCase(loginUser.rejected, (state, action) => {
            state.user = null
            state.error = action.error?.message || 'An Error has occured'
        });

        //handle cases for when user registers






    })
});

