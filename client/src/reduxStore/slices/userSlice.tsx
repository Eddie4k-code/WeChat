/* Handles user state throughout application */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/User";
import axios from 'axios';


interface UserState {
    user: User | null,
    error: any
}

interface UserFields {
    username: string
    password: string
}


const initalState: UserState = {
    user: null,
    error: null
}


export const loginUser = createAsyncThunk<User, any>('user/loginUser', async (data: UserFields, thunkAPI) => {
    try {

        const user = await axios.post(`http://localhost:5000/api/auth/login`, {username: data.username, password:data.password});

        localStorage.setItem('user', JSON.stringify(user.data));
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.data.token}`;

        return user.data;


    } catch (err:any) {
        return thunkAPI.rejectWithValue({error: err.response?.data?.ErrorMessage || 'An Error has Occured'});

    }
});


export const registerUser = createAsyncThunk<User, any>('user/registerUser', async (data: UserFields, thunkAPI) => {
    try {

        const newUser = await axios.post(`http://localhost:5000/api/auth/register`, {username: data.username, password:data.password});

        localStorage.setItem('user', JSON.stringify(newUser.data));
        axios.defaults.headers.common['Authorization'] = `Bearer ${newUser.data.token}`;

        return newUser.data;


    } catch (err:any) {
        return thunkAPI.rejectWithValue({error: err.response?.data?.ErrorMessage || 'An Error has Occured'});

    }
});

export const verifyUser = createAsyncThunk<any>('user/verifyUser', async (_, thunkAPI) => {

    try {

        const response = await axios.get('http://localhost:5000/api/auth/verifyUser');

        console.log("Is the user verified???");

        console.log(response.data);

        return response.data;

    } catch (err:any) {
        return thunkAPI.rejectWithValue({error: err.response?.data?.ErrorMessage || 'An Error has Occured'});
    }
    
    },

    {   //verifyUser will only occur if user is in localstorage.
        condition: () => {
            if (!localStorage.getItem("user")) {
                return false;
            }
        }
    }

);



export const userSlice = createSlice({
    name: 'user',
    initialState: initalState,
    reducers: {

    },
    extraReducers: (builder => {
        //handle cases for when user logs in.
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.error = null;
            state.user = action.payload;
        });

        builder.addCase(loginUser.rejected, (state, action) => {
            state.user = null;
            state.error = action.payload || 'An Error has occured';
        });

        //handle cases for when user registers

        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.error = null;
        });

        builder.addCase(registerUser.rejected, (state, action) => {
            state.user = null;
            state.error = action.payload || 'An error has occured';
        });


        //handle case for when user is verified
        builder.addCase(verifyUser.fulfilled, (state) => {

            const verifiedUser = JSON.parse(localStorage.getItem('user')!);

            state.user = verifiedUser;
            

        });

        builder.addCase(verifyUser.rejected, (state, action) => {
            state.user = null;
            state.error = action.payload || 'User is not verified!';
        });







    })
});

