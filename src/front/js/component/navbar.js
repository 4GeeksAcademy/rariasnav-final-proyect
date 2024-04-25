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
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{store.loggedUser == null && <span>Loading...</span>}	
					{store.loggedUser == false && <button className="btn btn-primary" onClick={ ()=> navigate('/loginRegisterPreview') }>Sign up / Log in</button>}				
					{store.loggedUser &&
					<div className="navbar-buttons">
						Hi {store.loggedUser.full_name}
						<button className="btn btn-primary m-2" onClick={ ()=> navigate('/myProfile') }>My profile</button> 
						<button className="btn btn-primary m-2" onClick={ ()=> handleLogout() }>Logout</button>
					</div>}
										
				</div>
			</div>
		</nav>
	);
};
