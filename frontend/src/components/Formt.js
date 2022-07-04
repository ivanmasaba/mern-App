import React, { useState, useEffect } from 'react';



const Form = () => {

    const [file, setFile] = useState('')
 
    const handleSubmit = async (e ) =>{
        e.preventDefault()
        console.log(file)

      const res = await fetch('http://localhost:3000/p', {
        method: 'POST',
        body: JSON.stringify(file),
        headers: {
            'Content-Type': 'application/json'
        }
      }).then(res => res.json())

      alert(JSON.stringify(res))

    }

    const onChange = (e) => {
        const f = e.target.files[0]
        setFile(f)
        // const formData = new FormData()
        // formData.append("pic", file.pic[0])
        // console.log(file)

        // console.log(formData)
    }
    
    return ( 
            <form onSubmit={handleSubmit}>
                 <input type="file" name="pic" onChange={onChange}  />
                 <button>Submit</button>
            </form>
           
    
      
     );
}
 
export default Form;