import React, { useState, useEffect } from 'react';

import {useForm} from 'react-hook-form'

const Form = () => {
   const {register, handleSubmit } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }
    
    return ( 
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="file" name="pic" ref={register} />

            <button type="submit">submit</button>
        </form>
     );
}
 
export default Form;