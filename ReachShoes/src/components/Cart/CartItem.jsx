import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <div className={classes.qtyDiv}>
            {props.largeQty > 0 ? (
              <span className={classes.amount}>L ({props.largeQty})</span>
            ) : (
              <></>
            )}
            {props.mediumQty > 0 ? (
              <span className={classes.amount}>M ({props.mediumQty})</span>
            ) : (
              <></>
            )}
            {props.smallQty > 0 ? (
              <span className={classes.amount}>S ({props.smallQty})</span>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
