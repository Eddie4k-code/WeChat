import axios from 'axios';
import { store } from '../reduxStore/configureStore';

const axiosHttp = axios.create({
    baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}`
});

//add authorization header for each request.
axiosHttp.interceptors.request.use(
    (config) => {

        let token;

        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem('user')!).token;
        }

       

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    }
);


axiosHttp.interceptors.response.use(
    (response) => {
        return response;
    },

    (error:any) => {
        return Promise.reject(error.response.data.ErrorMessage);
    } 
)

export default axiosHttp;