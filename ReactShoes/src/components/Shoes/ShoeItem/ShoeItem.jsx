import React, { useContext } from "react";
import classes from "./ShoeItem.module.css";
import CartContext from "../../../context/cart-context";
import ShoeContext from "../../../context/shoe-context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShoeItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  const cartCtx = useContext(CartContext);
  const shoeCtx = useContext(ShoeContext);

  const largeBuyHandler = () => {
    if (props.largeQty <= 0) return toast.warn("Large Size - Out of stock");

    cartCtx.addItem({
      name: props.name,
      id: props.id,
      largeQty: 1,
      mediumQty: 0,
      smallQty: 0,
      price: props.price,
    });

    shoeCtx.buyShoe("largeQty", props.id);
  };

  const mediumBuyHandler = () => {
    if (props.mediumQty <= 0) return toast.warn("Medium Size - Out of stock");

    cartCtx.addItem({
      name: props.name,
      id: props.id,
      largeQty: 0,
      mediumQty: 1,
      smallQty: 0,
      price: props.price,
    });
    shoeCtx.buyShoe("mediumQty", props.id);
  };

  const smallBuyHandler = () => {
    if (props.smallQty <= 0) return toast.warn("Small Size - Out of stock");

    cartCtx.addItem({
      name: props.name,
      id: props.id,
      largeQty: 0,
      mediumQty: 0,
      smallQty: 1,
      price: props.price,
    });
    shoeCtx.buyShoe("smallQty", props.id);
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
    </li>
  );
};

export default ShoeItem;
