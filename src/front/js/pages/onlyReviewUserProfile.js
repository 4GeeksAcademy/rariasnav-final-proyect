import React, {useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useParams, Navigate } from "react-router-dom";

export const OnlyReviewUserProfile = () => {
    const {actions, store} = useContext(Context)
    const {userId} = useParams()
    const [user, setUser] = useState({})
    const [userKnowlegge, setUserKnowledge] = useState([])

    const galleryImages = [
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300?grayscale",
        "https://picsum.photos/200/300/?blur",
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/200/300?random=1",
        "https://picsum.photos/200/300?random=2",
    ];

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
        <div className="container my-5">
            {user == null && <Navigate to='/pendingRequests'/>}
            {user && 
                <div className="profile-body">
                    <div className="profile-header text-center mb-4">
                    <img src="https://picsum.photos/200" className="profile-picture" alt="Profile"/>
                    <h1 className="profile-name">{user.full_name}</h1>
                    <button type="button" className="btn btn-light ms-2" onClick={() => navigate('/editMyProfile')}>
                        <i className="fa-solid fa-gear"></i>
                    </button>
                </div>

                <div className="profile-section mb-4">
                    <h3>Profile Summary</h3>
                    <p>{user.profile_resume}</p>
                </div>

                <div className="profile-section mb-4">
                    <h3>Personal Information</h3>
                    <p>Birth date: {user.date_of_birth}</p>
                    <p>Gender: {user.gender}</p>
                </div>

                {user.role === 'vendor' && (
                    <div className="profile-section mb-4">
                        <h3>Offer Knowledge</h3>
                        <div className="dropdown">
                            <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                I can offer to you...
                            </button>
                            <ul className="dropdown-menu dropdown-knowledge">
                                {userKnowlegge.map( (known, index)=>{
                                    return(                                        
                                        <li className="dropdown-item" key={index}>{known.knowledge.description}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                )}

                <div className="profile-section mb-4">
                    <h3>Gallery</h3>
                    <div className="row">
                        {galleryImages.map((imgSrc, index) => (
                            <div className="col-md-4 col-sm-6 mb-3" key={index}>
                                <div className="card h-100">
                                    <img src={imgSrc} className="card-img-top gallery-img" alt={`Gallery ${index}`} />
                                    <div className="card-body">
                                        <h5 className="card-title">Gallery Image {index + 1}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> 
            </div> 
            }               
        </div>
    )
}