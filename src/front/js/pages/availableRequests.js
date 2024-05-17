import React, {useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/home.css";

export const AvailableRequests = () =>{
    const {actions, store} = useContext(Context)
    const navigate = useNavigate()
    //filters available and pending requests
    const requests = store.servicesRequests.filter( serviceRequest => serviceRequest.is_active === true && serviceRequest.status === 'pending')
    //brings the subcategories the vendor has knowledge
    const userKnowledge = store.offerKnowledge.map( (known)=> known.knowledge.description )
    //filters the available requests by vendor knowledge
    const filteredRequests = requests.filter( request => userKnowledge.includes(request.service_subcategory_id.description) )
    const [requestServiceOffer, setRequestServiceOffer] = useState({
        "status": "pending",
        "rate": " "
    })
    const [tempData, setTempData] = useState()

    

    async function sendData(data){    
        const result = await actions.offerServiceRequest(data, requestServiceOffer)
        if( result==201 ){
            navigate("/takenRequests")
        }
    }

    const handleChange = (e) =>{
        setRequestServiceOffer({
            ...requestServiceOffer, [e.target.name]: e.target.value
        })
    }

    useEffect( ()=>{
        actions.getOfferKnowedle()
    },[])

    useEffect( ()=>{
        actions.getServicesRequests()
    },[])

    return(
        <div className="container">
            <div className="body m-5">
                <div className="text-center ">
                    <h1 className="">Offers you can take</h1>
                </div>
                <div className="list-group">
                    {filteredRequests.map( (filteredServiceRequest) => {
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
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#requestOfferModal" onClick={ ()=> setTempData({"service_request_id": filteredServiceRequest.id, "client_email": filteredServiceRequest.user.email})}>
                                    Take request
                                </button>

                                    <div className="modal fade" id="requestOfferModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5">Make your offer for this task</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <p className="modal-title fs-5">In order to take the task, give your rate</p>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text">$</span>
                                                        <input type="number" className="form-control" name="rate" value={requestServiceOffer.rate} onChange={handleChange}/>
                                                    </div> 
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={ ()=>sendData(tempData) }>Take task</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div> 
                        )
                    })}                     
                </div>
            </div>
        </div>
    )
}