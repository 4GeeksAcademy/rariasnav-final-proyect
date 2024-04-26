import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Navigate } from "react-router-dom";
import "../../styles/home.css";

export const GetInMyProfile = () =>{
    const {store, actions} = useContext(Context)
    const navigate = useNavigate()
    const [user, setUser] = useState(store.loggedUser)

    return(
        <div className="container">
            {store.loggedUser == false && <Navigate to='/loginRegisterPreview'/>}                            
            <div className="Portrait">
				<div className="body text-center">
					<div className="container">
						<div className="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-5">
							<button type="button" className="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"></button>
							<h1 className="text-body-emphasis">Profile portrait</h1>
						</div>
					</div>
				</div>
			</div>
            <div className="Picture mx-5">
                <div className="body row g-0"> 
                    <div className="col-md-3">
                        <img src="https://picsum.photos/200" className="ProfilePicture position-absolute" style={{borderRadius: "50%"}} alt="..."/> 
                    </div>
                    <div className="col-md-9">
                        <div className="Profiletitle">
                            <div className="d-inline">
                                <h1>{user.full_name}</h1>
                                <button type="button" className="btn btn-light" onClick={ ()=>navigate('/editMyProfile') }><i className="fa-solid fa-gear"></i></button>
                            </div>
                                                       
                            <div className="row">
                                <h5 className="col-md-4">{user.knowledge}</h5>
                                <h5 className="col-md-4">{user.knowledge}</h5>
                            </div>
                        </div>                        
                    </div>                       
                </div>
            </div>  
            <div className="ProfileResume mb-3 mt-5">
                <div className="body">
                    <div className="container">
                        <p>{user.profile_resume}</p>
                    </div> 
                </div>  
            </div>
            <div className="ProfileMoreInfo m-5">
                <div className="body row m-5">                    
                        <div className="col-md-6 col-sm-12">
                            <p>Birth date: {user.date_of_birth}</p>
                            <p>Gender: {user.gender}</p>
                            <p>Knowledge: {user.knowledge}</p>
                        </div>
                        <div className="card col-md-6 col-sm-12">
                            <div className="card text-bg-dark" style={{height: "6rem"}}>
                                <img src="https://picsum.photos/200" className="card-img" alt="..." style={{maxWidth: "100%", maxHeight: "100%"}}/>
                                <div className="card-img-overlay">
                                    <h5 className="card-title">Some galery works</h5>                                    
                                </div>
                            </div>
                        </div>                                        
                </div>
            </div>  
            <div className="ProfileRates mb-3 mt-5">
                <div className="body">
                    <div className="container">
                        <div className="card w-75 mb-3">
                            <div className="card-body">
                                <h5 className="card-title">User who rates</h5>
                                <p className="card-text">Here we are going to find comments about any rate the vendor has done.</p>
                            </div>
                        </div>
                    </div> 
                </div>  
            </div>                 
        </div>   
    )
}