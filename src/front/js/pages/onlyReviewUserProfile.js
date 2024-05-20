import React, {useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useParams, Navigate } from "react-router-dom";

export const OnlyReviewUserProfile = () => {
    const {actions, store} = useContext(Context)
    const {userId} = useParams()
    const [user, setUser] = useState({})
    const [userKnowlegge, setUserKnowledge] = useState([])

    useEffect( ()=>{
        const getData = async () => {
            const response = await actions.loadUserDataById(userId)
            if(response){
                setUser(response.user)
                setUserKnowledge(response.knowledge)
            }
        } 
        getData()        
    },[userId])

    return(
        <div className="container">
            {user == null && <Navigate to='/pendingRequests'/>}
            {user && 
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
                                    <h1>{user.full_name}</h1>
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
                                <p>Birth date:{user.birth_date}</p>
                                <p>Gender: {user.gender}</p>
                                {user.role === 'vendor' &&
                                    <div className="dropdown">
                                        <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            I can offer to you...
                                        </button>
                                        <ul className="dropdown-menu dropdownKnowledge">
                                            {userKnowlegge.map( (known, index)=>{
                                                return(                                        
                                                    <li className="dropdown-item" key={index}>{known.knowledge.description}</li>
                                                )
                                            })}                         
                                        </ul>
                                    </div>
                                }
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