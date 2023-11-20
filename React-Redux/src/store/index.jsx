import { configureStore } from '@reduxjs/toolkit';
import AuthReducers from './authSlice';
import CountReducers from './counterSlice';

const store = configureStore({
  reducer: { counter: CountReducers, auth: AuthReducers },
});

export default store;
