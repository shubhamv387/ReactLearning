import { useEffect, useReducer } from 'react';
import CartContext from './cart-context';
import {
  addToCart,
  deleteFromCart,
  getCart,
  orderFromCart,
} from '../services/cartServices';

const initialCartState = { items: [], totalAmount: 0 };

const cartReducer = (state, action) => {
  if (action.type === 'GET_CART') {
    const initialTotalAmount = action.cartItems.reduce(
      (accPrice, item) => accPrice + item.price,
      0
    );

    return { items: action.cartItems, totalAmount: initialTotalAmount };
  }

  if (action.type === 'ADD') {
    const updatedTotalAmount = state.totalAmount + action.item.price;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        qty: existingCartItem.qty + action.item.qty,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    let updatedItems;

    if (existingCartItem.qty === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        qty: +existingCartItem.qty - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === 'ORDER') {
    return initialCartState;
  }

  return initialCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    initialCartState
  );

  const addItemToCartHandler = (item) => {
    addToCart(item)
      .then((data) => {
        dispatchCartAction({ type: 'ADD', item: data });
      })
      .catch((err) => console.log(err.message));
  };

  const removeItemFromCartHandler = (id, _id) => {
    deleteFromCart(_id)
      .then((data) => {
        dispatchCartAction({ type: 'REMOVE', id: id });
      })
      .catch((err) => console.log(err.message));
  };

  const orderHandler = (items) => {
    orderFromCart(items)
      .then((data) => {
        dispatchCartAction({ type: 'ORDER' });
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getCart()
      .then((data) => {
        dispatchCartAction({ type: 'GET_CART', cartItems: data });
      })
      .catch((err) => console.log(err.message));
  }, []);

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    order: orderHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
