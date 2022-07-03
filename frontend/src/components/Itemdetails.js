import React from 'react';

const Itemdeatils = ({ item }) => {
    return ( 
        <div className="workout-details">
            <h4>{ item.name }</h4>
            {/* <p><strong>Category: </strong> { item.category }</p> */}
             {/* <p><strong>Description: </strong> { item.description }</p> */}
        </div>
     );
}
 
export default Itemdeatils;