import React, {useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const AvailableRequests = () =>{
    const {actions, store} = useContext(Context)

    useEffect( ()=>{
        actions.getServicesRequests()
    },[])

    console.log(store.servicesRequests)

    return(
        <div className="container">
            <div className="body m-5">
                <div className="text-center ">
                    <h1 className="">Offers you can take</h1>
                </div>
                <div className="list-group">
                    {store.servicesRequests.filter( serviceRequest => serviceRequest.is_active === true && serviceRequest.status === 'active').map( (filteredServiceRequest) => {
                        return(
                            <div className="list-group-item mb-3" key={filteredServiceRequest.id}>
                                <div className="d-flex justify-content-between">
                                    <h3 className=" ">{filteredServiceRequest.service_subcategory_id.description}</h3>
                                    <p className=" ">{filteredServiceRequest.address}</p>
                                </div>
                                <h4 className="">From: {filteredServiceRequest.user.full_name}</h4>                            
                                <p className="">{filteredServiceRequest.description}</p>
                                <p className="">{filteredServiceRequest.moving}</p>
                                <p className="">{filteredServiceRequest.tools}</p>
                                <button type="submit" className="btn btn-primary">Take request</button>
                            </div> 
                        )
                    })}                     
                </div>
            </div>
        </div>
    )
}