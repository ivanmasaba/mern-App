import React, { useState, useEffect } from 'react';

const Items = () => {
    const [items,setItems] = useState(null)

    useEffect( () =>{
        const furn = async () => {
            const response = await fetch('/furniture')

            const json = await response.json()

            if( response.ok ){ // if no error in api
                setItems(json)
            }
        }

        furn()
    },[] )

    return ( 
        <div className="home">
        <h3>Furniture Categories</h3>
        <br />
        <div className="workouts">
            {items && items.map( (item) => (
                <p  key={item._id}>{ item.imageName }</p>
                // <Itemdetails key={items._id} item = { items } />
            ) )}
        </div>
    </div>
     );
}
 
export default Items;