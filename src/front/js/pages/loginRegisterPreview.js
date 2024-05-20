import React, {useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const LoginRegisterPreview = () => {
    const {store, actions} = useContext(Context)
    const navigate = useNavigate()

    useEffect( ()=>{
        if(store.loggedUser){
            navigate('/')
        }
    },[store.loggedUser, navigate])
    return(

        <div className="Container">
            <div className="body text-center m-5">
                <div className="d-grid gap-2 m-auto" style={{width: "26rem"}}>
                    <h1>Taskit</h1>
                    <button className="btn btn-primary" type="button" onClick={ ()=> navigate('/signUp') }>Sign up</button>
                    <button className="btn btn-primary" type="button" onClick={ ()=> navigate('/login') }>Log in</button>
                </div>
            </div>
        </div>
        
    )
}