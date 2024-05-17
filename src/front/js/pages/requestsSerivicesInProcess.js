import React, {useContext} from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const RequestsServicesInProcess = () =>{
    const {actions, store} = useContext(Context)

    
    return(
        
        <div className="container">
            {store.loggedUser && store.loggedUser.role === 'client' &&
            <div className="body m-5">
                <div className="text-center ">
                    <h1 className="">Your requests in process</h1>
                </div>
            </div>
            }
        </div>           
    )
}