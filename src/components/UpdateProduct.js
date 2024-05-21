import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from 'react-router-dom'

export default function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [catagory, setCatagory] = useState("");
  const [company, setCompany] = useState("");
const navigate =useNavigate();
  const params= useParams();

  useEffect(()=>{
    
    getaProductDetails();
  },[])


  const getaProductDetails=async()=>{
    console.log(params);
    let result =await fetch(`http://localhost:5000/product/${params.id}`,{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
    });
    result= await result.json();
    console.log(result)
    setName(result.name);
    setPrice(result.price);
    setCatagory(result.catagory)
    setCompany(result.company)

  }
  const updateProduct=async()=>{
console.log(name, price,catagory,company);
let result =await fetch(`http://localhost:5000/product/${params.id}`,
{
    method:"PUT",
    body:JSON.stringify({name, price,catagory,company}),
    headers:{
        "Content-Type": "application/json",
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))} `
    }
})
result=await result.json()
console.log(result)
navigate('/')
  }

  return (
    <div className="product">
      <h1> Update product</h1>
      <input
        type="text"
        placeholder="Enter Product Name"
        className="inputBox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      
      <input
        type="Number"
        placeholder="Enter Product Price"
        className="inputBox"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      ></input>

      <input
        type="text"
        placeholder="Enter Product catagory"
        className="inputBox"
        value={catagory}
        onChange={(e) => {
          setCatagory(e.target.value);
        }}
      ></input>
      
      <input
        type="text"
        placeholder="Enter Product company"
        className="inputBox"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      ></input>
      
      <button onClick={updateProduct}>update Product</button>
    </div>
  );
}
