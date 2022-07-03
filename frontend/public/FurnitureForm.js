import React, { useState, useEffect } from 'react';
// Import React FilePond
import { FilePond, File, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

import FilePondPluginImageResize from 'filepond-plugin-image-resize'

import FilePondPluginFileEncode from 'filepond-plugin-file-encode'
import filepond from '../css/filepond/javascripts/fileupload'

// Register the plugins
registerPlugin(FilePondPluginImagePreview, FilePondPluginImageResize, FilePondPluginFileEncode)


const FurnitureForm = () => {
    const [categories,setCategories] = useState(null)

    useEffect( () =>{
        const category = async () => {
            const response = await fetch('/category')

            const json = await response.json()

            if( response.ok ){ // if no error in api
                setCategories(json)
            }
        }

        category()
    },[] )

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category,setCategory] = useState('')
    const [files, setFiles] = useState([])
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const item = { name, category, description, files }

    {JSON.stringify(files)}
    {console.log(files)}
        
        // const response = await fetch('/furniture', {
        //     method: 'POST',
        //     body: JSON.stringify( item ),
        //     headers: { 'Content-Type': 'application/json' }
        // })

        // const json = await response.json()

        // if( !response.ok ){
        //     setError( json.error )
        // }
        // if( response.ok ){
        //     setName('')
        //     setError( null )
        //     console.log('new item added...', json)
        // }
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
                <FilePond
                className="filepond cover"
                    files={files}
                    onupdatefiles={setFiles}
                    allowMultiple={true}
                    maxFiles={1}
                    server='/furniture'
                    name="image" 
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                />
                </div>

             <button type="submit">Add Item</button>
             { error && <div className="error">{error}</div> }
        </form>
     );
}
 
export default FurnitureForm;