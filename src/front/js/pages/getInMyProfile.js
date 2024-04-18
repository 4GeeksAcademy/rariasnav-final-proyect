import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const GetInMyProfile = () =>{
    const {store, actions} = useContext(Context)
    
    useEffect( ()=>{
        
    },[] )
    


    return(
        <div>
            
            <h1>My profile</h1>
            <button onClick={()=>actions.getInMyProfile()}>token</button>
        </div>
        
        
    )
}