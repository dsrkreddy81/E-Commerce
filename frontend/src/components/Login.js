import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';

const Login=()=>{
    const [Email,setEmail]=useState("");
    const [Password,setPassword]=useState("");

    const navigate=useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    });
    const handleLogin=async ()=>{
        console.warn(Email,Password);
        let res = await fetch("http://localhost:5000/api/users/login", {
            method: 'POST',
            body: JSON.stringify({Email,Password}), 
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
        <div className="login">
            <h1>Login</h1>
            <input className="input" type="text" placeholder="Email"
            value={Email} onChange={(e)=>setEmail(e.target.value)}
            />
            <input className="input" type="password" placeholder="Password"
            value={Password} onChange={(e)=>setPassword(e.target.value)}
            />
            <button onClick={handleLogin} className="button" type="button" >Login</button>
        </div>
    )
}

export default Login;