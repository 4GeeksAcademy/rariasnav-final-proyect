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

        <div className="container">
            <div className="body text-center m-5">
                <div className="d-grid gap-2 m-auto" style={{width: "26rem"}}>
                    <h1 className="text-primary-custom">Welcome to Taskit</h1>
                    <p className="text-secondary-custom">Connect with skilled professionals for any task you need done, without leaving your home</p>
                    <button className="btn btn-primary" type="button" onClick={ ()=> navigate('/signUp') }>Sign up</button>
                    <button className="btn btn-primary" type="button" onClick={ ()=> navigate('/login') }>Log in</button>
                </div>
            </div>
        </div>
        
    )
}