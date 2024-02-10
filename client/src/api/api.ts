import axios from 'axios';
import { store } from '../reduxStore/configureStore';
import { toast } from 'react-toastify';

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
    //handle processing errors for every axios request
    (error:any) => {
        toast.error(error.response.data.ErrorMessage || "An Error has Occured");
        return Promise.reject(error.response.data.ErrorMessage || "An Error has Occured");
    } 
)

export default axiosHttp;