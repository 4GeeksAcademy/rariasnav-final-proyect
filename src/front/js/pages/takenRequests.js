import React, {useContext} from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const TakenRequests = () =>{
    return(
        <div className="container">
            <div className="body m-5">
                <div className="text-center ">
                    <h1 className="">Offers you have taken</h1>
                </div>
                <div className="list-group">
                    <h3 className=" ">Active requests</h3>
                    <div className="list-group-item mb-3">
                        <div className="d-flex justify-content-between">
                            <h3 className=" ">description</h3>
                            <p className=" ">address</p>
                        </div>                            
                        <p className="">description</p>
                        <p className="">moving</p>
                        <p className="">tools</p>
                        <button type="submit" className="btn btn-danger">Cancel offer</button>
                    </div> 
                </div>
            </div>
        </div>
    )
}
