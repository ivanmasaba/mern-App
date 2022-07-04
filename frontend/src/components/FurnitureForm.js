import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategoriesContext } from "../components/hooks/useCategoriesContext";

const FurnitureForm = () => {
    const { categories, dispatch } = useCategoriesContext()  

    useEffect( () =>{
        const category = async () => {
            const response = await fetch('/category')

            const json = await response.json()

            if( response.ok ){ // if no error in api
                dispatch({ type: 'SET_CATEGORY', payload: json })
            }
        }

        category()
    },[] )

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category,setCategory] = useState('')
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(selectedFile)
        // const item = { name, category, description, file }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', category);
        formData.append('description', description);
		formData.append('file', selectedFile);

        
        const response = await fetch('http://localhost:3000/furniture', {
            method: 'POST',
            body: formData,
        })

        const json = await response.json()

        if( !response.ok ){
            setError( json.error )
        }
        if( response.ok ){
            setName('')
            setDescription('')
            setCategory('')
            setSelectedFile()
            setError( null )
            console.log('new item added...', json)
            navigate('/items')
        }
    }

    return ( 
        <form className="create" onSubmit={handleSubmit}>
            
            <h3>Add a new Furniture Item</h3>

            <label>Item Name: </label>
            <input 
            type="text"
            onChange={ (e) => setName(e.target.value) }
            value={name}
             />

                <div>
                    <label >Category:</label>
                    <select value={category} onChange={ (e) => setCategory(e.target.value)}>
                    {categories && categories.map( (categori) => (

                        <option
                         key={categori._id} 
                         value={categori._id}
                         >{categori.name}</option> 
                    ) )}
                </select>  
                </div>

                <label>Description:</label>
                <textarea
                 cols="30"
                 rows="10" 
                 onChange={ (e) => setDescription(e.target.value)}
                 ></textarea>

            <div >
            <label>Image:</label>
               <input type="file" name='file' onChange={(e) => {setSelectedFile(e.target.files[0]); setIsFilePicked(true);}} />
                </div>

             <button type="submit">Add Item</button>
             { error && <div className="error">{error}</div> }
        </form>
     );
}
 
export default FurnitureForm;