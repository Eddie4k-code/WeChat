/* Handles user state throughout application */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/User";
import axios from 'axios';
import axiosHttp from "../../api/api";
import { StarRateRounded } from "@mui/icons-materi1al";
import { toast } from "react-toastify";

//shape of the data the user state will contain
export interface UserState {
    user: User | null,
    error: any
    loading: boolean,
}


interface UserFields {
    username: string
    password: string
}


const initalState: UserState = {
    user: null,
    error: null,
    loading: true
}


export const loginUser = createAsyncThunk<User, any>('user/loginUser', async (data: UserFields, thunkAPI) => {
    try {

        const user = await axiosHttp.post(`/auth/login`, {username: data.username, password:data.password});

        localStorage.setItem('user', JSON.stringify(user.data));
        return user.data;


    } catch (err:any) {
        return thunkAPI.rejectWithValue({error: err});

    }
});


export const registerUser = createAsyncThunk<User, any>('user/registerUser', async (data: UserFields, thunkAPI) => {
    try {

        const newUser = await axiosHttp.post(`/auth/register`, {username: data.username, password:data.password});

        localStorage.setItem('user', JSON.stringify(newUser.data));

        return newUser.data;


    } catch (err:any) {
        
        return thunkAPI.rejectWithValue({error: err});

    }
});

export const verifyUser = createAsyncThunk<string>('user/verifyUser', async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
    try {

        const response = await axiosHttp.get(`/auth/verifyUser`);

        console.log(response.data);

        return response.data;

    } catch (err:any) {
        localStorage.removeItem("user");
        return thunkAPI.rejectWithValue({error: 'Not authenticated, please login to access that route...'});
    }
    
    }

);



export const userSlice = createSlice({
    name: 'user',
    initialState: initalState,
    reducers: {

        setUser: (state: UserState, action: PayloadAction) => {
            state.user = action.payload;
        },

        logout: (state: UserState) => {
            state.user = null;
            localStorage.removeItem("user");
            state.loading = false;
        }

    },
    extraReducers: (builder => {
        //handle cases for when user logs in.
        builder.addCase(loginUser.fulfilled, (state: UserState, action: PayloadAction) => {
            state.user = action.payload;
            state.loading = false;
        });

        builder.addCase(loginUser.rejected, (state: UserState) => {
            state.user = null;
            state.loading = false;
        });

        //handle cases for when user registers

        builder.addCase(registerUser.fulfilled, (state: UserState, action: PayloadAction) => {
            state.user = action.payload;
            state.loading = false;
        });

        builder.addCase(registerUser.rejected, (state: UserState) => {
            state.user = null;
            state.loading = false;
        });


        //handle case for when user is verified
        builder.addCase(verifyUser.fulfilled, (state: UserState) => {

            const verifiedUser = JSON.parse(localStorage.getItem('user')!);

            state.user = verifiedUser;
            state.loading = false;
            

        });

        builder.addCase(verifyUser.rejected, (state: UserState) => {
            state.user = null;
            state.error = null;
            state.loading = false;
        });







    })
});

export const {setUser, logout} = userSlice.actions;


