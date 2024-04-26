import React, {useContext} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const PostForAService = () => {
    return(
        <div className="Container">
            {store.loggedUser == false && <Navigate to='/loginRegisterPreview'/>}
            {store.loggedUser &&
            <div className="body m-5">
                <div className="text-center ">
                    <p className="">Tell us about your task, this will help us to find the better person for what you are looking for. </p>
                </div>
                <h1 className="">Task name</h1>                
                    <form className="list-group">
                        <div class="list-group-item mb-3">
                            <h2 className="">Your location</h2>                             
                            <input type="address" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                        <br/>
                        <div class="list-group-item mb-3">
                            <h2 className="">Tools</h2>                             
                                <div class="form-floating">
                                    <textarea class="form-control"id="floatingTextarea2" style={{height: "100px"}}></textarea>
                                    <label for="floatingTextarea2">Describe the tools you would require for this task</label>
                                </div>
                        </div>
                        <br/>
                        <div class="list-group-item mb-3">
                            <h2 className="">Moving</h2>                             
                                <div class="form-floating">
                                    <textarea class="form-control"id="floatingTextarea2" style={{height: "100px"}}></textarea>
                                    <label for="floatingTextarea2">In case you need any type of transportation, please describe details about it</label>
                                </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" class="btn btn-primary">Look for a vendor</button>
                        </div>                        
                    </form>
                    
             
            </div>}
        </div>
    )
}