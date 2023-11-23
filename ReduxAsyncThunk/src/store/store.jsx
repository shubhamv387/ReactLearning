import { configureStore } from '@reduxjs/toolkit';
import CartReducers from './cartSlice';

const store = configureStore({
  reducer: {
    cart: CartReducers,
  },
});

export default store;
