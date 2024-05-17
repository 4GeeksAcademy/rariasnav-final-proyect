import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const RequestsHistory = () => {
    const {store, actions} = useContext(Context)
    const servicesRequestByUser = store.servicesRequests.filter( serviceRequest => serviceRequest.user.email === store.loggedUser.email)

    useEffect( ()=>{
        actions.getServicesRequests()
    },[])

    useEffect( ()=>{
        if(store.loggedUser.role === 'vendor'){
            navigate('/')
        }
    },[])

    return(        
        <div className="container">
            <div className="body m-5">
                <div className="text-center ">
                    <h1 className="">Your requests</h1>
                </div>
                <div className="list-group">
                    <h3 className=" ">Active requests</h3>
                    {servicesRequestByUser.map( (filteredServiceRequest)=>{
                        if(filteredServiceRequest.is_active == true && filteredServiceRequest.status === 'pending'){
                            return(                          
                                <div className="list-group-item mb-3" key={filteredServiceRequest.id}>
                                    <div className="d-flex justify-content-between">
                                        <h3 className=" ">{filteredServiceRequest.service_subcategory_id.description}</h3>
                                        <p className=" ">{filteredServiceRequest.address}</p>
                                    </div>                            
                                    <p className="">{filteredServiceRequest.description}</p>
                                    <p className="">{filteredServiceRequest.moving}</p>
                                    <p className="">{filteredServiceRequest.tools}</p>
                                    <button type="submit" className="btn btn-danger" onClick={ ()=>actions.cancelServiceRequest(filteredServiceRequest.id)}>Cancel request</button>
                                </div>                            
                            )
                        }                        
                    })}                    
                </div>
                <div className="list-group mt-5">
                    <h3 className=" ">Previous requests</h3>
                    {store.servicesRequests.filter( serviceRequest => serviceRequest.user.email === store.loggedUser.email).map( (filteredServiceRequest)=>{
                        if(filteredServiceRequest.is_active == false){
                            return(
                                <div className="list-group-item mb-3" key={filteredServiceRequest.id}>
                                    <div className="d-flex justify-content-between">
                                        <h3 className=" ">{filteredServiceRequest.service_subcategory_id.description}</h3>
                                        <p className=" ">{filteredServiceRequest.address}</p>
                                    </div>                            
                                    <p className="">{filteredServiceRequest.description}</p>
                                    <p className="">{filteredServiceRequest.moving}</p>
                                    <p className="">{filteredServiceRequest.tools}</p>
                                </div>
                            )
                        }
                    })}                    
                </div>
            </div>
        </div>
    )
}