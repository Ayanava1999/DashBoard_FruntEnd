import React, { useState } from "react";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [catagory, setCatagory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const addProduct = async () => {
    console.log(!name);
    if (!name || !price || !catagory || !company) {
      setError(true);
      return false;
    }
    console.log(name, price, catagory, company);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    console.log(userId);

    let result = await fetch("http://localhost:5000/addproduct", {
      method: "POST",
      body: JSON.stringify({ name, price, catagory, company, userId }),
      headers: {
        "Content-Type": "application/json",
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    });
    result = await result.json();
    console.log(result);
  };

  return (
    <div className="product">
      <h1> Add product</h1>
      <input
        type="text"
        placeholder="Enter Product Name"
        className="inputBox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      {error && !name && (
        <span className="invalid-input">Enter valid Name</span>
      )}
      <input
        type="Number"
        placeholder="Enter Product Price"
        className="inputBox"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      ></input>
      {error && !price && (
        <span className="invalid-input">Enter valid Price</span>
      )}
      <input
        type="text"
        placeholder="Enter Product catagory"
        className="inputBox"
        value={catagory}
        onChange={(e) => {
          setCatagory(e.target.value);
        }}
      ></input>
      {error && !catagory && (
        <span className="invalid-input">Enter valid Catagory</span>
      )}
      <input
        type="text"
        placeholder="Enter Product company"
        className="inputBox"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      ></input>
      {error && !company && (
        <span className="invalid-input">Enter valid Company</span>
      )}
      <button onClick={addProduct}>AddProduct</button>
    </div>
  );
}
