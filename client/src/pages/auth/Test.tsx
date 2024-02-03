import { useAppSelector } from "../../reduxStore/configureStore";
import {useEffect} from 'react';

export const Test = () => {

    const {user} = useAppSelector(state => state.user);


    useEffect(() => {

        console.log("User is ");
        console.log(user);

    }, [user]);


    


    return(
    
    <><h1>test</h1></>
    
    
    );

}