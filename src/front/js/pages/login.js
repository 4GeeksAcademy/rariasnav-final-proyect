import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () =>{
    const {actions, store} = useContext(Context)
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const navigate = useNavigate()    

    async function sendData(e) {
        e.preventDefault()
        const result = await actions.login(loginEmail, loginPassword)
        if( result ){
            navigate('/demo')
        }
    }


    return(
        <div className="Container">
            <div className="body text-center m-5">
                <h1>Website name</h1>
                {store.auth === true ? <Navigate to='/'/> :
                 <form className="m-auto" style={{width: "26rem"}}>
                 <div className="mb-3">
                     <label htmlFor="email" className="form-label">Email</label>
                     <input type="email" className="form-control" aria-describedby="emailHelp"
                     name="email" value={loginEmail} onChange={ (e)=>setLoginEmail(e.target.value) }/>                        
                 </div>
                 <div className="mb-3">
                     <label htmlFor="password" className="form-label">Password</label>
                     <input type="password" className="form-control" name="password" value={loginPassword}
                     onChange={ (e)=>setLoginPassword(e.target.value) }/>
                 </div>                    
                 <button type="submit" className="btn btn-primary" onClick={ (e)=>sendData(e) }>Login</button>
                </form>
                }
                
            </div>
        </div>
    )
}