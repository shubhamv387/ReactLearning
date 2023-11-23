import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
  cartItems: [],
  totalQty: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addToCart(state, action) {
      state.totalAmount = state.totalAmount + +action.payload.price;
      state.totalQty = state.totalQty + action.payload.qty;

      const existingItemIndex = state.cartItems.findIndex(
        (i) => i.id === action.payload.id
      );

      const existingItem = state.cartItems[existingItemIndex];

      if (existingItem) {
        let updatedItem = {
          ...existingItem,
          qty: existingItem.qty + 1,
          total: existingItem.total + +existingItem.price,
        };
        state.cartItems[existingItemIndex] = updatedItem;
      } else {
        state.cartItems = state.cartItems.concat({
          ...action.payload,
          total: +action.payload.price,
        });
      }
    },

    removeFromCart(state, action) {
      const existingItemIndex = state.cartItems.findIndex(
        (i) => i.id === action.payload.id
      );

      const existingItem = state.cartItems[existingItemIndex];

      state.totalAmount = state.totalAmount - existingItem.price;
      state.totalQty = state.totalQty - 1;

      if (existingItem.qty > 1) {
        let updatedItem = {
          ...existingItem,
          qty: existingItem.qty - 1,
          total: existingItem.total - existingItem.price,
        };
        state.cartItems[existingItemIndex] = updatedItem;
      } else {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
    order(state, action) {},
  },
});

export const CartActions = cartSlice.actions;

export default cartSlice.reducer;
