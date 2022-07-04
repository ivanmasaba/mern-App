import React, { useEffect } from 'react';
import { useCategoriesContext } from "../components/hooks/useCategoriesContext";
import './Itemdetails.css'

const Itemdetails = ({ item }) => {
    const { categories, dispatch } = useCategoriesContext()  

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
        <div className="title">
            <h4>{ item.name }</h4>
            <div className='describe'>
            <p><strong>Category: </strong> { item.categoryID }</p>
             <p><strong>Description: </strong> { item.description }</p>
             <p><strong>Description: </strong> { item.imageName }</p>
            </div>
            
        </div>
     );
}
 
export default Itemdetails;