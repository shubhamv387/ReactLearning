import { useContext } from 'react';
import classes from './Cart.module.css';
import Model from '../UI/Model';
import CartContext from '../../context/cart-context';
import CartItem from './CartItem';
import { Bounce, toast } from 'react-toastify';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          _id={item._id}
          name={item.name}
          price={item.price}
          onRemove={cartCtx.removeItem}
        />
      ))}
    </ul>
  );

  const closeCartModel = () => {
    props.onHideCart();
  };

  const orderBtnHandler = () => {
    cartCtx.order(cartCtx.items);
    toast.success('Your order has been placed. Enjoy!', {
      position: 'top-center',
      autoClose: 3000,
      transition: Bounce,
    });
    props.onHideCart();
  };

  return (
    <Model onHideCart={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={closeCartModel} className={classes['button--alt']}>
          Close
        </button>
        {hasItems && (
          <button onClick={orderBtnHandler} className={classes.button}>
            Generate Bill
          </button>
        )}
      </div>
    </Model>
  );
};

export default Cart;
