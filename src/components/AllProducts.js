// src/components/AllProducts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../redux/actions/cartActions';
import './AllProducts.css'; // Import the CSS file

const AllProducts = () => {
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
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
    setEditingProductId(product.id);
    setEditedProduct(product);
  };

  const handleSave = (productId) => {
    axios.put(`https://my-json-server.typicode.com/ayush2342/dataRepo/products/${productId}`, editedProduct)
      .then(() => {
        dispatch({ type: 'UPDATE_PRODUCT', payload: editedProduct });
        toast.success('Product updated successfully');
        setEditingProductId(null);
      })
      .catch(() => {
        toast.error('Failed to update product');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value
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
              {editingProductId === product.id ? (
                <>
                  <input 
                    type="text" 
                    name="name" 
                    value={editedProduct.name} 
                    onChange={handleChange} 
                  />
                  <textarea
                    name="description"
                    value={editedProduct.description}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    name="price"
                    value={editedProduct.price}
                    onChange={handleChange}
                  />
                  <button onClick={() => handleSave(product.id)}>Save</button>
                  <button onClick={() => setEditingProductId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p className="price">Price: ${product.price}</p>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                </>
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
