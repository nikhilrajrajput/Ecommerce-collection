import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../redux/actions/cartActions';
import { toast } from 'react-toastify';
import './Cart.css'; // Import the CSS file

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cart || []); // Safely access cart state

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    toast.success('Product removed from cart');
  };

  return (
    <div className="cart-container">
      <h2 className="cart-header">Your Cart</h2>
      {cartItems.length === 0 && <p className="cart-empty">Your cart is empty</p>}
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} />
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          <button onClick={() => handleRemoveFromCart(item.id)}>Remove from Cart</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
