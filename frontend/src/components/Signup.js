import React,{useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Signup=()=>{
    const [Name,setName]=useState("");
    const [Email,setEmail]=useState("");
    const [Password,setPassword]=useState("");

    const navigate=useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    });
    const collectData=async ()=>{
        console.warn(Email,Name,Password);
        let res = await fetch("http://localhost:5000/api/users", {
            method: 'POST',
            body: JSON.stringify({Name,Email,Password}), 
            headers: { 'Content-Type': 'application/json' }
        });
        let result=await res.json();
        if(result.success){
            localStorage.setItem("user", JSON.stringify(result));
            navigate('/');
        }
        else{
            alert(result.message);
        }
    }

    return(
        <div className="signup">
            <h1>Signup</h1>
            <input className="input" type="text" placeholder="Email"
            value={Email} onChange={(e)=>setEmail(e.target.value)}
            />
            <input className="input" type="text" placeholder="Name"
            value={Name} onChange={(e)=>setName(e.target.value)}
            />
            <input className="input" type="password" placeholder="Password"
            value={Password} onChange={(e)=>setPassword(e.target.value)}
            />
            <button onClick={collectData} className="button" type="button" >Signup</button>
        </div>
    )
}

export default Signup;