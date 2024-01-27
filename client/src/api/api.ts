import axios from 'axios';
import { store } from '../reduxStore/configureStore';


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true

axios.interceptors.request.use(config => {
    

    const token = store.getState().user.user?.token;

    if (token) {
        config.headers.authorization = `Bearer ${token}`
    }

    console.log("Working or what?")

    return config;

});
