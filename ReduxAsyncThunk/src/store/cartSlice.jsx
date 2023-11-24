import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './uiSlice';

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

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        'https://react-http-4c3ab-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }
  };
};

export const CartActions = cartSlice.actions;

export default cartSlice.reducer;
