import React, { useContext } from "react";
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
		<nav className="navbar custom-navbar">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1"><h2>Taskit</h2></span>
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
						<button className="btn btn-primary m-2" onClick={ ()=> navigate('/services') }>Services</button>						
						<div className="dropdown d-inline">							
							<button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
								{store.loggedUser.full_name}
							</button>
							<ul className="dropdown-menu">								
								<li><span className="dropdown-item" onClick={ ()=> navigate('/myProfile') }>My profile</span></li>
								{store.loggedUser.role === 'client' &&
									<div>
										<li><span className="dropdown-item" onClick={ ()=> navigate("/requestHistory") }>Requests</span></li>
										<li><span className="dropdown-item" onClick={ ()=> navigate("/pendingRequests") }>Pending</span></li>
										<li><span className="dropdown-item" onClick={ ()=> navigate("/requestsInProcess") }>In process</span></li>
									</div>
								}
								{store.loggedUser.role === 'vendor' &&
									<div>
										<li><span className="dropdown-item" onClick={ ()=> navigate("/availableRequests") }>Available requests</span></li>
										<li><span className="dropdown-item" onClick={ ()=> navigate("/takenRequests") }>Taken requests</span></li>
									</div>
								}
								<li><span className="dropdown-item" onClick={ ()=> handleLogout() }>Logout</span></li>								
							</ul>
						</div>
					</div>
					}										
				</div>
			</div>
		</nav>
	);
};
