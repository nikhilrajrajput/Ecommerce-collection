// src/components/ProductDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`/api/products/${id}`) // Replace with your API endpoint
      .then(response => {
        setProduct(response.data);
      })
      .catch(() => {
        toast.error('Failed to fetch product details');
      });
  }, [id]);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast.success('Product added to cart');
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
    ) : <p>Loading...</p>
  );
};

export default ProductDetail;
