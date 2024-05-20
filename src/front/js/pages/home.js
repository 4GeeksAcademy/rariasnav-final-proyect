import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()	
	const [query, setQuery] = useState("")	
	const [users, setUsers] = useState([])
	const [categories, setCategories] = useState([])
	const [subcategories, setSubcategories] = useState([])
	const [displaySubcategories, setDisplaySubcategories] = useState([])
	
	const getRandomSubcategory = (array, num) =>{
		const shuffled = array.slice();
		for(let i = shuffled.length - 1; i > 0; i--){
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
		}
		return shuffled.slice(0, num)
	}

	useEffect( ()=>{
        const getData = async () => {
            const response = await actions.loadTestData()
            if(response){
                setUsers(response)
            }
        } 
        getData()        
    },[])

	useEffect( ()=>{
        const getData = async () => {
            const response = await actions.getCategories()
            if(response){
                setCategories(response)
            }
        } 
        getData()        
    },[])

	useEffect( ()=>{
        const getData = async () => {
            const response = await actions.getSubcategories()
            if(response){
                setSubcategories(response)
            }
        } 
        getData()        
    },[])

	useEffect( ()=>{
		const selectedSubcategories = getRandomSubcategory(subcategories, 9)
		setDisplaySubcategories(selectedSubcategories)
	},[subcategories])	

	useEffect( ()=> {
		setUsers(users.filter( (item) => item.name.toLowerCase().includes(query) ))
	}, [query] )

	return (
		<div className="Container m-5">
			<div className="Jumbotron">
				<div className="body text-center">
					<div className="container my-5">
						<div className="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-5">	
							<ul className="list-group">
								<input className="form-control text-center list-group-item" placeholder="What service are you looking for?" type="search" name="search_bar" onChange={ (e)=> setQuery(e.target.value.toLowerCase())}/>
								<li className="list-group-item"></li>	
							</ul>						
						</div>
					</div>
				</div>
			</div>
			<div className="testDiv">
				{users.sort( ()=> Math.random() - 0.5 ).map( (user)=> {
					return(
						<div className="cardTest m-3" style={{width: "18rem"}} key={user.id}>
							<div className="card-body">
								<h5 className="card-title">{user.name}</h5>
								<h6 className="card-subtitle mb-2 text-body-secondary">{user.email}</h6>	
							</div>
						</div>
					)
				} )}
				
			</div>

			<div className="button-group row m-5 text-center">
				{categories.map( (category)=> {
					return(
						<button className="button-group btn btn-outline-dark text-center m-auto border border-0" style={{width: "auto"}}
						onClick={ ()=>navigate('/demo') } key={category.id}>
							<div className="button-icon text-center m-auto">
								{category.icon}
							</div>					
							<div className="button-body">
								<p className="card-title">{category.name}</p>						
							</div>
						</button>
					)})}			
			</div>

			<div className="album py-5 bg-body-tertiary">
    			<div className="container">
					<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
						{displaySubcategories.map( (subcategory)=> {
							return(
								<div className="col" key={subcategory.id}>
									<div className="card shadow-sm">
										<svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
										<div className="card-body">
											<h3 className="card-text">{subcategory.name}</h3>
											<p className="card-text">{subcategory.description}</p>
										<div className="d-flex justify-content-between align-items-center">
											<div className="btn-group">
												<button type="button" className="btn btn-sm btn-outline-secondary" onClick={ ()=>navigate('/postForAService/'+subcategory.id) }>Ask for this service</button>
											</div>								
										</div>
										</div>
									</div>
								</div>
							)})} 
					</div>
				</div>
  		</div>
	</div>		
	);
};
