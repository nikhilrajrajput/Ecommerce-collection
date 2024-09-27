// src/components/Cart.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../redux/actions/cartActions';
import { toast } from 'react-toastify';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    toast.success('Product removed from cart');
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 && <p>Your cart is empty</p>}
      {cartItems.map(item => (
        <div key={item.id}>
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
