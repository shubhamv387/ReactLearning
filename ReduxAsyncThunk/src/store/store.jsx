import { configureStore } from '@reduxjs/toolkit';
import CartReducers from './cartSlice';
import uiSlice from './uiSlice';

const store = configureStore({
  reducer: {
    cart: CartReducers,
    ui: uiSlice.reducer,
  },
});

export default store;
