import React, { useReducer } from "react";
import CartContext from "./cart-context";

const initialCartState = { items: [], totalAmount: 0 };

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    let qty;

    if (action.item.qty === "largeQty") qty = largeQty;
    else if (action.item.qty === "mediumQty") qty = mediumQty;
    else if (action.item.qty === "smallQty") qty = smallQty;

    const updatedTotalAmount = state.totalAmount + action.item.price;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    let updatedItems;

    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: +existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === "REMOVE") {
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
    console.log(item);
    // dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const orderHandler = () => {
    dispatchCartAction({ type: "ORDER" });
  };

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
