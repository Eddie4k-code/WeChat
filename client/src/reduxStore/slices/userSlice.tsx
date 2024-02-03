/* Handles user state throughout application */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/User";
import axios from 'axios';
import axiosHttp from "../../api/api";
import { StarRateRounded } from "@mui/icons-material";


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
        return thunkAPI.rejectWithValue({error: err.response?.data?.ErrorMessage || 'An Error has Occured'});

    }
});


export const registerUser = createAsyncThunk<User, any>('user/registerUser', async (data: UserFields, thunkAPI) => {
    try {

        const newUser = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/register`, {username: data.username, password:data.password});

        localStorage.setItem('user', JSON.stringify(newUser.data));

        return newUser.data;


    } catch (err:any) {
        return thunkAPI.rejectWithValue({error: err.response?.data?.ErrorMessage || 'An Error has Occured'});

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
        return thunkAPI.rejectWithValue({error: err.response?.data?.ErrorMessage || 'An Error has Occured'});
    }
    
    },
        /*
    {   //verifyUser will only occur if user is in localstorage.
        condition: () => {
            if (!localStorage.getItem("user")) {
                return false;
            }
        }
    }
    */

);



export const userSlice = createSlice({
    name: 'user',
    initialState: initalState,
    reducers: {

        setUser: (state, action) => {
            state.user = action.payload;
        }

    },
    extraReducers: (builder => {
        //handle cases for when user logs in.
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.error = null;
            state.user = action.payload;
            state.loading = false;
        });

        builder.addCase(loginUser.rejected, (state, action) => {
            state.user = null;
            state.error = action.payload || 'An Error has occured';
            state.loading = false;
        });

        //handle cases for when user registers

        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.error = null;
            state.loading = false;
        });

        builder.addCase(registerUser.rejected, (state, action) => {
            state.user = null;
            state.error = action.payload || 'An error has occured';
            state.loading = false;
        });


        //handle case for when user is verified
        builder.addCase(verifyUser.fulfilled, (state) => {

            const verifiedUser = JSON.parse(localStorage.getItem('user')!);

            state.user = verifiedUser;
            state.loading = false;
            

        });

        builder.addCase(verifyUser.rejected, (state, action) => {
            state.user = null;
            state.error = null;
            state.loading = false;
        });







    })
});

export const {setUser} = userSlice.actions;


