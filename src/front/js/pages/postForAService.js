import React, {useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import "../../styles/home.css";

export const PostForAService = () => {
    const {actions, store} = useContext(Context)
    const navigate = useNavigate()
    const {serviceSubcategoryId} = useParams()
    const user = store.loggedUser
    const [service_request, setServiceRequest] = useState({
        "address": " ",
        "description": " ",
        "tools": " ",
        "moving": " ",
        "service_subcategory_id": serviceSubcategoryId
    })

    useEffect( ()=>{
        if(!store.loggedUser){
            navigate('/loginRegisterPreview')
        }
    },[])

    async function saveServiceRequest(e){
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

    // useEffect( ()=>{
    //     if(store.loggedUser.role === 'vendor'){
    //         navigate('/')
    //     }
    // },[])

    return(
        <div className="Container"> 
            {store.loggedUser.role != 'client' && <Navigate to='/'/>}            
            {store.loggedUser && store.loggedUser.role === 'client' &&
            <div className="body m-5">
                <div className="text-center ">
                    <h3 className="">Tell us about your task, this will help us to find the better person for what you are looking for. </h3>
                </div>
                <h1 className="">Task name</h1>                
                    <form className="list-group">
                        <div className="list-group-item mb-3">
                            <h2 className="">Your location</h2>                             
                            <input type="address" className="form-control" id="address" aria-describedby="emailHelp" onChange={handleChange}
                            name="address" value={service_request.address}/>
                        </div>
                        <br/>
                        <div className="list-group-item mb-3">
                            <h2 className="">Details</h2>                             
                                <div className="form-floating">
                                    <textarea className="form-control" id="details" style={{height: "100px"}} onChange={handleChange}
                                    name="description" value={service_request.description}></textarea>
                                    <label htmlFor="details">Give us a breef description about your taks, with the most specific details</label>
                                </div>
                        </div>
                        <br/>
                        <div className="list-group-item mb-3">
                            <h2 className="">Tools</h2>                             
                                <div className="form-floating">
                                    <textarea className="form-control" id="tools" style={{height: "100px"}} onChange={handleChange}
                                    name="tools" value={service_request.tools}></textarea>
                                    <label htmlFor="tools">Describe the tools you would require for this task</label>
                                </div>
                        </div>
                        <br/>
                        <div className="list-group-item mb-3">
                            <h2 className="">Moving</h2>                             
                                <div className="form-floating">
                                    <textarea className="form-control" id="moving" style={{height: "100px"}} onChange={handleChange}
                                    name="moving" value={service_request.moving}></textarea>
                                    <label htmlFor="moving">In case you need any type of transportation, please describe details about it</label>
                                </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary" onClick={ (e)=>saveServiceRequest(e) }>Request service</button>
                        </div>                        
                    </form>
                    
             
            </div>}
        </div>
    )
}