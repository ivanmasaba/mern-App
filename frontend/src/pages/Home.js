import React, { useEffect, useState } from "react";
import { useCategoriesContext } from "../components/hooks/useCategoriesContext";

// components
import Categorydetails from '../components/Categorydetails'
import CategoryForm from '../components/CategoryForm'


const Home = () => {
    const { categories, dispatch } = useCategoriesContext()  
    // const [furnitures,setFurnitures] = useState(null)
    useEffect( () =>{
        const furniture = async () => {
            const response = await fetch('/category/')
            // const response = await fetch('/furniture/')

            const json = await response.json()

            if( response.ok ){ // if no error in api
                dispatch({ type: 'SET_CATEGORY', payload: json })
                // setFurnitures(json)
            }
        }

        furniture()
    },[] )
    
    return ( 
        <div className="home">
            <h3>Furniture Categories</h3>
            <br />
            <div className="workouts">
                {categories && categories.map( (furniture) => (
                    <Categorydetails key={furniture._id} item = { furniture } />
                ) )}
            </div>
            <CategoryForm />
        </div>
     );
}
 
export default Home; 