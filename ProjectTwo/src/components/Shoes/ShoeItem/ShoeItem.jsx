import React, { useContext } from "react";
import classes from "./ShoeItem.module.css";
import ShoeItemForm from "./ShoeItemForm";
import CartContext from "../../../context/cart-context";
import ShoeContext from "../../../context/shoe-context";

const ShoeItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  const cartCtx = useContext(CartContext);
  const shoeCtx = useContext(ShoeContext);

  console.log(props);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      name: props.name,
      id: props.id,
      amount: amount,
      price: props.price,
    });
  };

  const largeBuyHandler = () => {
    cartCtx.addItem({
      name: props.name,
      id: props.id,
      qty: "largeQty",
      price: props.price,
    });
  };

  const mediumBuyHandler = () => {
    cartCtx.addItem({
      name: props.name,
      id: props.id,
      qty: "mediumQty",
      price: props.price,
    });
  };

  const smallBuyHandler = () => {
    cartCtx.addItem({
      name: props.name,
      id: props.id,
      qty: "smallQty",
      price: props.price,
    });
  };

  return (
    <li className={classes.Shoe}>
      <div className={classes.shoeData}>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>

      <div className={classes.form}>
        <button onClick={largeBuyHandler}>Buy Large ({props.largeQty})</button>
        <button onClick={mediumBuyHandler}>
          Buy Medium ({props.mediumQty})
        </button>
        <button onClick={smallBuyHandler}>Buy Small ({props.smallQty})</button>
      </div>

      {/* <ShoeItemForm onAddToCart={addToCartHandler} />

      <ShoeItemForm onAddToCart={addToCartHandler} />

      <ShoeItemForm onAddToCart={addToCartHandler} /> */}
    </li>
  );
};

export default ShoeItem;
