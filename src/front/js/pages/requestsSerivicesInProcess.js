import React, {useContext} from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const RequestsServicesInProcess = () =>{
    const {actions, store} = useContext(Context)

    
    return(
        
        <div className="container">
            {store.loggedUser && store.loggedUser.role === 'client' &&
            <div className="body m-5">
                <div className="text-center ">
                    <h1 className="">Your requests in process</h1>
                </div>
                <div className="list-group">
                <div className="list-group-item mb-3">
                                <div className="d-flex justify-content-between">
                                    <h3 className=" ">description</h3>
                                </div>
                                <h4 className="">Tasker: </h4>                        
                                <h4 className="">Rate:</h4> 
                                <div className="list-group-item-footer">
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#requestOfferModal">
                                        Accept tasker
                                    </button>
                                    <button type="button" className="btn btn-primary mx-2" >Review tasker</button>

                                    <div className="modal fade" id="requestOfferModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5">Are you sure to take this tasker?</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>                                          
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Accept tasker</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                </div>
            </div>
            }
        </div>           
    )
}