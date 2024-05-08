import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const {store, actions} = useContext(Context)
	const navigate = useNavigate()

	const handleLogout = () => {
		actions.logout()
		navigate('/login')
	}
	
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{store.loggedUser == null && <span>Loading...</span>}	
					{store.loggedUser == false && 
					<div className="navbar-buttons">
						<button className="btn btn-primary m-2" onClick={ ()=> navigate('/services') }>Services</button>
						<button className="btn btn-primary m-2" onClick={ ()=> navigate('/loginRegisterPreview') }>Sign up / Log in</button>
					</div>}				
					{store.loggedUser &&
					<div className="navbar-buttons">						
						<div className="dropdown">
							<button className="btn btn-primary m-2" onClick={ ()=> navigate('/services') }>Services</button>
							<button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							</button>
							<ul className="dropdown-menu">								
								<li><span className="dropdown-item" onClick={ ()=> navigate('/myProfile') }>My profile</span></li>
								{store.loggedUser.role === 'client' &&
								<li><span className="dropdown-item" onClick={ ()=> navigate("/requestHistory") }>Requests</span></li>
								}
								{store.loggedUser.role === 'vendor' &&
								<>
								<li><span className="dropdown-item" onClick={ ()=> navigate("/availableRequests") }>Available requests</span></li>
								<li><span className="dropdown-item" onClick={ ()=> navigate("/takenRequests") }>Taken requests</span></li>
								</>
								}
								<li><span className="dropdown-item" onClick={ ()=> handleLogout() }>Logout</span></li>
								
							</ul>
						</div>
					</div>}
										
				</div>
			</div>
		</nav>
	);
};
