import React, {useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import "../../styles/home.css";

export const PostForAService = () => {
    const {actions, store} = useContext(Context)
    const navigate = useNavigate()
    const {serviceSubcategoryId} = useParams()
    const [service_request, setServiceRequest] = useState({
        "address": " ",
        "description": " ",
        "tools": " ",
        "moving": " ",
        "service_subcategory_id": serviceSubcategoryId
    })
    const saveServiceRequest = async (e) =>{
        e.preventDefault()
        const result = await actions.postForAService(service_request)
        if( result == 201 ){
            navigate("/requestHistory")
        }
    } 
    
    const handleChange = (e) =>{
        setServiceRequest({
            ...service_request, [e.target.name]: e.target.value
        })
    }

    useEffect( ()=>{
        if(store.loggedUser && store.loggedUser.role === 'vendor'){
            navigate('/')
        }
    },[store.loggedUser])

    return(
        <div className="container-custom">
            {!store.loggedUser && (
                <div className="body-custom m-5">
                    <div className="text-center ">
                        <h2 className="">Still don´t have an account?</h2>
                        <p>
                            <a href="" onClick={ ()=>navigate('/signUp') }>Create an account</a>
                        </p>
                    </div> 
                    <div className="text-center ">
                        <h5 className="">I have an account ... 
                            <a 
                            className="link-offset-2 link-underline link-underline-opacity-0" 
                            href="/login" 
                            style={{textDecoration: "none"}}
                            >
                                login
                            </a>
                        </h5>
                    </div>
                </div> 
            )}          
            {store.loggedUser && store.loggedUser.role === 'client' && (
            <div className="body-custom m-5">
                <div className="text-center ">
                    <h3 className="text">
                        Tell us about your task, this will help us to find the better person for what you are looking for. 
                    </h3>
                </div>
                <h1 className="text-primary-custom">Task name</h1>                
                    <form className="list-group">
                        <div className="list-group-item mb-3">
                            <h2 className="text-primary-custom">Your location</h2>                             
                            <input 
                                type="address" 
                                className="form-control form-control-custom" 
                                id="address" 
                                aria-describedby="emailHelp" 
                                onChange={handleChange}
                                name="address" 
                                value={service_request.address}
                            />
                        </div>
                        <br/>
                        <div className="list-group-item mb-3">
                            <h2 className="text-primary-custom">Details</h2>                             
                                <div className="form-floating">
                                    <textarea 
                                        className="form-control form-control-custom" 
                                        id="details" 
                                        style={{height: "100px"}} onChange={handleChange}
                                        name="description" 
                                        value={service_request.description}
                                    ></textarea>
                                    <label 
                                        htmlFor="details">
                                            Give us a brief description about your taks, with the most specific details
                                    </label>
                                </div>
                        </div>
                        <br/>
                        <div className="list-group-item mb-3">
                            <h2 className="text-primary-custom">Tools</h2>                             
                                <div className="form-floating">
                                    <textarea 
                                        className="form-control form-control-custom" 
                                        id="tools" 
                                        style={{height: "100px"}} 
                                        onChange={handleChange}
                                        name="tools" 
                                        value={service_request.tools}
                                    ></textarea>
                                    <label 
                                        htmlFor="tools">
                                            Describe the tools you would require for this task
                                    </label>
                                </div>
                        </div>
                        <br/>
                        <div className="list-group-item mb-3">
                            <h2 className="text-primary-custom">Moving</h2>                             
                                <div className="form-floating">
                                    <textarea 
                                        className="form-control form-control-custom" 
                                        id="moving" 
                                        style={{height: "100px"}} 
                                        onChange={handleChange}
                                        name="moving" 
                                        value={service_request.moving}
                                    ></textarea>
                                    <label 
                                        htmlFor="moving">
                                            In case you need any type of transportation, please describe details about it
                                    </label>
                                </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary btn-primary-custom" onClick={ (e)=>saveServiceRequest(e) }>
                                Request service
                            </button>
                        </div>                        
                    </form>                  
            </div>
            )}
        </div>
    )
}