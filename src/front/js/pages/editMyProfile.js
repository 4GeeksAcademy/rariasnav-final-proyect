import React, {useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const EditMyProfile = () => {
    const {store, actions} = useContext(Context)
    const navigate = useNavigate()
    const [user, setUser] = useState({
        "full_name": "",
        "date_of_birth": "",
        "address":"",
        "profile_resume": "",
        "knowledge": ""
    })

    const handleChange = (e) =>{
        setUser({
            ...user, [e.target.name]: e.target.value
        })
    }

    async function saveInformation(e){
        e.preventDefault()
        const result = await actions.updateUserInformation(user)
        if( result == 201){
            navigate('/myProfile')
        }
    }

    useEffect( ()=> {
        if(store.loggedUser){
            setUser(store.loggedUser)
        }
    },[store.loggedUser] )

    return(
        <div className="container">
            <div className="body m-5">
                <h1>Profile data</h1>
                    <form>
                    <div className="mb-3">
                        <label htmlFor="full_name" className="form-label">Full name</label>
                        <input type="text" className="form-control" aria-describedby="emailHelp" name="full_name" value={user.full_name} onChange={handleChange}/>   
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="date_of_birth" className="form-label">Date of birth</label>
                                    <input type="date" className="form-control" aria-describedby="emailHelp" name="date_of_birth" value={user.date_of_birth} onChange={handleChange}/>   
                                </div>
                                <div className="col-6">                              
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="text" className="form-control" aria-describedby="emailHelp" name="address" value={user.address} onChange={handleChange}/> 
                                </div>      
                            </div>                                                       
                        </div>
                        <div className="form-floating">
                            <textarea className="form-control" placeholder="Profile resume" style={{height: "100px"}} type="text" name="profile_resume" value={user.profile_resume} onChange={handleChange}></textarea>
                            <label htmlFor="profile_resume">Profile resume</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="knowledge" className="form-label">Knowledge</label>
                            <input type="text" className="form-control" aria-describedby="emailHelp" name="knowledge" value={user.knowledge} onChange={handleChange}/>                            
                        </div>                   
                        <button type="submit" className="btn btn-primary" onClick={ (e)=> saveInformation(e) }>Save</button>
                        <button className="btn btn-primary m-2" onClick={ ()=> navigate('/myProfile') }>Back</button>
                    </form>
                
            </div>
        </div>
    )
}