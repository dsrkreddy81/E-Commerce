import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Prod = () => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        getProd();
    }, []);

    const getProd = async () => {
        let res = await fetch('http://localhost:5000/api/products');
        res = await res.json();

        if (res.success) {
            setProduct(res.data);
        } else {
            console.error("Error fetching products", res.message);
        }
    };

    const handleDelete = async (id) => {
        console.warn(id);
        
        let res = await fetch(`http://localhost:5000/api/products/${id}`, { 
            method: "DELETE"
        });
    
        res = await res.json();
        console.log("API Response:", res);
        if (res.success) {
            setProduct((prevProducts) => prevProducts.filter((item) => item._id !== id));
        } else {
            console.error("Error deleting product", res.message);
        }
    };

    const handleSearch = async (e) => {
        let key = e.target.value;
        if (key) {
            try {
                let res = await fetch(`http://localhost:5000/api/products/search/${key}`);
                res = await res.json();
                console.log("API Response:", res);
                if (Array.isArray(res) && res.length > 0) {
                    setProduct(res); 
                } 
                else {
                    console.error("Error fetching search results: No data found");
                    setProduct([]);
                }
            } 
            catch (error) {
                console.error("Error in fetching search results:", error);
            }
        } 
        else {
            getProd();
        }
    };
    
    return (
        <div>
      <h2>Product List</h2>
      <input type="text" placeholder="Search" onChange={handleSearch} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>{item.image}</td>
              <td>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
                <Link to={`/update/${item._id}`}>Update</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
};

export default Prod;
