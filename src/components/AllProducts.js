// src/components/AllProducts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../redux/actions/cartActions';
import './AllProducts.css'; // Import the CSS file

const AllProducts = () => {
  const [editingProductId, setEditingProductId] = useState(null);
  const [sorted, setSorted] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);

  useEffect(() => {
    axios.get('https://my-json-server.typicode.com/ayush2342/dataRepo/products')
      .then(response => {
        dispatch({ type: 'SET_PRODUCTS', payload: response.data });
      })
      .catch(() => {
        toast.error('Failed to fetch products');
      });
  }, [dispatch]);

  const handleEdit = (product) => {
    const updatedProduct = { ...product, price: product.price + 1 }; // Example edit
    axios.put(`https://my-json-server.typicode.com/ayush2342/dataRepo/products/${product.id}`, updatedProduct)
      .then(() => {
        dispatch({ type: 'UPDATE_PRODUCT', payload: updatedProduct });
        toast.success('Product updated successfully');
        setEditingProductId(null);
      })
      .catch(() => {
        toast.error('Failed to update product');
      });
  };

  const handleDelete = (productId) => {
    axios.delete(`https://my-json-server.typicode.com/ayush2342/dataRepo/products/${productId}`)
      .then(() => {
        dispatch({ type: 'DELETE_PRODUCT', payload: productId });
        toast.success('Product deleted successfully');
      })
      .catch(() => {
        toast.error('Failed to delete product');
      });
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success('Product added to cart');
  };

  const handleSort = () => {
    setSorted(!sorted);
  };

  const sortedProducts = [...products].sort((a, b) => sorted ? a.price - b.price : 0);

  return (
    <div>
      <button className="sort-button" onClick={handleSort}>{sorted ? 'Remove Sort' : 'Sort by Price'}</button>
      <div className="products-container">
        {sortedProducts.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <div className="product-card-content">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">Price: ${product.price}</p>
              {editingProductId === product.id ? (
                <button onClick={() => handleEdit(product)}>Save</button>
              ) : (
                <button onClick={() => setEditingProductId(product.id)}>Edit</button>
              )}
              <button className="delete" onClick={() => handleDelete(product.id)}>Delete</button>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
