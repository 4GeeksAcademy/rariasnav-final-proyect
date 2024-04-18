import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const SignUp = () => {
    const {store, actions} = useContext(Context)
    const [user, setUser] = useState({
        "email": "",
        "password": "",
        "is_active": true
    })
    const navigate = useNavigate()

    async function saveUSer(e){
        e.preventDefault()
        const result = await actions.createUser(user)
        if( result==201 ){
            navigate("/")
        }
    }

    const handleChange = (e) => {
        setUser({
            ...user, [e.target.name] : e.target.value
        })
    }

    return(
        <div className="Container">
            <div className="body text-center m-5">
                <h1>Website name</h1>
                <form className="m-auto" style={{width: "26rem"}}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" aria-describedby="emailHelp"
                        name="email" value={user.email} onChange={handleChange}/>                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password}
                        onChange={handleChange}/>
                    </div>                    
                    <button type="submit" className="btn btn-primary" onClick={ (e)=>saveUSer(e) }>Create account</button>
                </form>
                                
            </div>
        </div>
    )
}