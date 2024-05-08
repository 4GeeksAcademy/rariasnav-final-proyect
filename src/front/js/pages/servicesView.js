import React,{useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const ServicesView = () => {
    const {store, actions} = useContext(Context)
    
    useEffect( ()=>{
        actions.getCategories()
    },[])    

    useEffect( ()=>{
        actions.getCategoriesSubcategories()
    },[])
    
    return(
        <div className="services-list-view">
            <div className="album py-5 bg-body-tertiary">
    			<div className="container">

					<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {store.categories.map( (category)=> {
                            return(
                                <div className="col" key={category.id}>
                                    <div className="card" style={{width:"100%", height:"225"}} >
                                        <img src="https://picsum.photos/200" className="card-img-top" alt="..."/>
                                        <div className="card-body">
                                            <h5 className="card-title">{category.name}</h5>
                                            <p className="card-text">{category.description}</p>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            {store.categoriesSubcategories.filter( categorySubcategory => categorySubcategory.service_category.name === category.name ).map( (filteredCategorySubcategory)=> {
                                                return(
                                                    <li className="list-group-item" key={filteredCategorySubcategory.id}>
                                                        <a href="#" className="card-link">{filteredCategorySubcategory.service_subcategory.name}</a>
                                                    </li>
                                                )
                                            })}                                            
                                        </ul>                               
                                    </div>
                                </div>
                            )})}
					</div>
				</div>
  		</div>
        </div>
    )
}