// SignUp.js
import React from "react";
import { useState , useEffect} from "react";
import {useNavigate} from 'react-router-dom'

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //use navigate is a hook used to redirect 
  const navigate=useNavigate();

  //if user is signup then signup page will not shown
useEffect(()=>{
 const auth=localStorage.getItem('user');
 if(auth){
   navigate('/')
 }
})

  //adding data and storing ot localstorage
  const collectData = async () => {
    console.warn(name, email, password);

    let result = await fetch("http://localhost:5000/register", {
      method: "POST", 
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    result = await result.json();
    console.log(result);
    
    localStorage.setItem('user', JSON.stringify(result.result));
    localStorage.setItem('token', JSON.stringify(result.auth));
    navigate('/')
    
  };

  return (
    <div className="register">
      <h1 className="text">Sign Up</h1>

      <input
        className="inputBox"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      ></input>
      <input
        className="inputBox"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      ></input>
      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      ></input>
      <button type="button" onClick={collectData}>
        SignUp
      </button>
    </div>
  );
}
