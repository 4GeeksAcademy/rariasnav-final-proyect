import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Navigate } from "react-router-dom";
import "../../styles/home.css";

export const GetInMyProfile = () =>{
    const {store, actions} = useContext(Context)
    const navigate = useNavigate()
    const [offerKnowledge, setOfferKnowledge] = useState([])
    const [userKnowledge, setUserKnowledge] = useState([])

    const getUserKnowledge = (email, role) => {
        if(role == 'vendor'){
            return offerKnowledge.filter(offerKnown => offerKnown.user.email === email);
        }
    };

    useEffect( ()=>{
        const getData = async () =>{
            const response = await actions.getOfferKnowedle()
            if(response){
                setOfferKnowledge(response)
            }
        }
        getData()
    },[actions])

    useEffect( ()=>{
        const getData = async() => {
            if(store.loggedUser && store.loggedUser.email){
                const knowledge = getUserKnowledge(store.loggedUser.email, store.loggedUser.role)
                setUserKnowledge(knowledge)
            }
        }
        getData()   
    },[store.offerKnowledge, store.loggedUser, offerKnowledge])

    return(
        <div className="container">
            {store.loggedUser == false && <Navigate to='/loginRegisterPreview'/>}  
            {store.loggedUser && 
            <div className="body">
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
                                    <h1>{store.loggedUser.full_name}</h1>
                                    <button type="button" className="btn btn-light" onClick={ ()=>navigate('/editMyProfile') }><i className="fa-solid fa-gear"></i></button>
                                </div>
                                                        
                                <div className="row">
                                    <h5 className="col-md-4">{store.loggedUser.knowledge}</h5>
                                    <h5 className="col-md-4">{store.loggedUser.knowledge}</h5>
                                </div>
                            </div>                        
                        </div>                       
                    </div>
                </div>  

                <div className="ProfileResume mb-3 mt-5">
                    <div className="body">
                        <div className="container">
                            <p>{store.loggedUser.profile_resume}</p>
                        </div> 
                    </div>  
                </div>
                <div className="ProfileMoreInfo m-5">
                    <div className="body row m-5">                    
                            <div className="col-md-6 col-sm-12">
                                <p>Birth date: {store.loggedUser.date_of_birth}</p>
                                <p>Gender: {store.loggedUser.gender}</p>
                                {store.loggedUser.role == 'vendor' && (
                                    <div className="dropdown">
                                        <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            I can offer to you...
                                        </button>
                                        <ul className="dropdown-menu dropdownKnowledge">
                                            {userKnowledge.map( (filteredKnowledge, index)=>{
                                                return(                                        
                                                    <li className="dropdown-item" key={index}>{filteredKnowledge.knowledge.description}</li>
                                                )
                                            })}                         
                                        </ul>
                                    </div>
                                )}                                
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
            </div> 
            }                       
        </div>   
    )
}