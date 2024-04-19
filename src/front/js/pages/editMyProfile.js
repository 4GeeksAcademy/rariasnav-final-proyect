import React, {useContext} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const EditMyProfile = () => {
    const {store, actions} = useContext(Context)
    const navigate = useNavigate()
    return(
        <div className="container">
            <div className="body m-5">
                <h1>Profile data</h1>
                    <form>
                        <div className="form-floating">
                            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
                            <label for="floatingTextarea2">Comments</label>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1"/>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                            <label className="form-check-label" for="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button className="btn btn-primary m-2" onClick={ ()=> navigate('/myProfile') }>Back</button>
                    </form>
                
            </div>
        </div>
    )
}