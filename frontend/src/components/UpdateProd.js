import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProd = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
    getProd();
  }, []);

  const getProd = async () => {
    let res = await fetch(`http://localhost:5000/api/products/${params.id}`);
    let data = await res.json();
    if (data.success) {
      setName(data.product.name);
      setPrice(data.product.price);
      setImage(data.product.image);
    } else {
      console.error("Error fetching product details:", data.message);
    }
  };

  const navigate = useNavigate();

  const handleUpdate = async (id) => {
    if (!name || !price || !image) {
      setError(true);
      return false;
    }

    let res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name, price, image }),
      headers: { "Content-Type": "application/json" },
    });
    let result = await res.json();
    if (result.success) {
      navigate('/');
    } else {
      alert('Error Updating');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="login">
      <h1>Update a Product</h1>
      <input className="input" type="text" placeholder="Name"
        value={name} onChange={(e) => setName(e.target.value)}/>
      {error && !name && <span>Enter valid name</span>}
      <input className="input" type="text" placeholder="Price"
        value={price} onChange={(e) => setPrice(e.target.value)}/>
      {error && !price && <span>Enter valid price</span>}
      <input className="input" type="text" placeholder="Image" 
      value={image} onChange={(e) => setImage(e.target.value)}/>
      {error && !image && <span>Enter valid image</span>}
      <button onClick={() => handleUpdate(params.id)} className="button" type="button">Update</button>
      <button onClick={handleCancel} className="button" type="button">Cancel</button>
    </div>
  );
};

export default UpdateProd;
