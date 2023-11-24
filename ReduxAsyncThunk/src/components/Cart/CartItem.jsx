import { useDispatch } from 'react-redux';
import { CartActions } from '../../store/cartSlice';
import classes from './CartItem.module.css';

const CartItem = (props) => {
  const { id, title, total, price, qty } = props.item;
  const dispatch = useDispatch();

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{qty}</span>
        </div>
        <div className={classes.actions}>
          <button
            onClick={() =>
              dispatch(CartActions.removeFromCart({ id, title, price, qty: 1 }))
            }
          >
            -
          </button>
          <button
            onClick={() =>
              dispatch(CartActions.addToCart({ id, title, price, qty: 1 }))
            }
          >
            +
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
