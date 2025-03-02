import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProd=()=>{
    const [name, setName]=useState("");
    const [price,setPrice]=useState("");
    const [image,setImage]=useState("");
    const [error, setError]=useState(false);
    const navigate=useNavigate();
    const handleAdd= async()=>{
        if(!name || !price || !image){
            setError(true);
            return false;
        }
        const userId=JSON.parse(localStorage.getItem('user'))._id;
        let res=await fetch("http://localhost:5000/api/products/",{
            method:'POST',
            body:JSON.stringify({name, price, image,userId}),
            headers:{'Content-Type':'application/JSON'}
        });
        let result=await res.json();
        if(result.success){
            navigate('/');
        }
        else{
            alert('Error Adding');
        }
    }

    const handleCancel=()=>{
        navigate('/');
    }

    return(
        <div className="login">
            <h1>Add a Product</h1>
            <input className="input" type="text" placeholder="Name"
            value={name} onChange={(e)=>setName(e.target.value)}/>
            {error && !name && <span>Enter valid name</span>}
            <input className="input" type="text" placeholder="Price"
            value={price} onChange={(e)=>setPrice(e.target.value)}/>
            {error && !price && <span>Enter valid price</span>}
            <input className="input" type="text" placeholder="Image"
            value={image} onChange={(e)=>setImage(e.target.value)}/>
            {error && !image && <span>Enter valid image</span>}
            <button onClick={handleAdd} className="button" type="button" >Add</button>
            <button onClick={handleCancel} className="button" type="button">Cancel</button>
        </div>
    )
}

export default AddProd;