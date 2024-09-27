// src/redux/reducers/cartReducer.js
import { ADD_TO_CART, REMOVE_FROM_CART } from '../redux/actions/cartActions';

const initialState = {
  cart: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Check if the product is already in the cart
      const existingProduct = state.cart.find(item => item.id === action.payload.id);
      if (existingProduct) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };

    default:
      return state;
  }
};

export default cartReducer;