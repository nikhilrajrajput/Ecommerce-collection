// src/components/ProductDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams(); // Get product ID from URL params
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch the product details using the correct API endpoint
    axios.get(`https://my-json-server.typicode.com/ayush2342/dataRepo/products/${id}`)
      .then(response => {
        setProduct(response.data); // Set the product details in state
      })
      .catch(() => {
        toast.error('Failed to fetch product details'); // Show error toast if the request fails
      });
  }, [id]);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product }); // Dispatch action to add product to cart
    toast.success('Product added to cart'); // Show success toast
  };

  return (
    product ? (
      <div>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    ) : <p>Loading...</p> // Display a loading message while fetching the product details
  );
};

export default ProductDetail;
