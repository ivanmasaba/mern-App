import React, { useEffect, useState } from 'react';
import { useCategoriesContext } from "../components/hooks/useCategoriesContext";
import { useFurnitureContext } from "../components/hooks/useFurnitureContext";
import './Itemdetails.css'

const Itemdetails = ({ item }) => {
    const { dispatch } = useFurnitureContext() 
    const [image, setImage] = useState(null)

    /****** GET IMAGE FROM DB ***** */
    const getImage = async (imageId) => {   
    const res = await fetch('http://localhost:3000'+imageId)
    const imageBlob = await res.blob()    
        // Then create a local URL for that image and print it 
    const imageObjectURL = URL.createObjectURL(imageBlob);
        setImage(imageObjectURL);   
    }
    /****** RUN THE IMAGE METHOD ***** */
    useEffect( () => {
        getImage( item.ImagePathe ) 
    }, [])

    /**********  DELETE AN ITEM *********** */
    const handleDelete = async () => {
        const res = await fetch('http://localhost:3000/furniture/' + item._id, {
            method: 'DELETE'
        } )
        const json = await res.json()

        if(res.ok){
            dispatch({ type: 'DELETE_ITEM', payload: json })
        }
    }

    return ( 
        <div className="title">
            {/* <h4>{ item.name }</h4> */}
            {/* <div className='describe'> */}
            {/* <p><strong>Category: </strong> { item.ImagePathe }</p> */}
             {/* <p><strong>Description: </strong> { item.description }</p> */}
             {/* <p><strong>Item Name: </strong> { item.imageName }</p> */}
                 
                <img src={image} alt="ok" /> 
            
            {/* </div> */}
            <div>{ item.name }</div>

            {/* <div>
            <strong>Item Name: </strong>{ item.name }
            <br />
            <strong>Description: </strong> { item.description }
            </div> */}
            
            {/* <span className='material-symbols-outlined' onClick={handleDelete}>delete</span> */}
        </div>
     );
}
 
export default Itemdetails;