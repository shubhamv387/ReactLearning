import classes from './CartButton.module.css';
import { useSelector } from 'react-redux';

const CartButton = (props) => {
  const { totalQty } = useSelector((state) => state.cart);
  const cartBtnHandler = () => {
    props.setIsCartShown(!props.isCartShown);
  };

  return (
    <button onClick={cartBtnHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQty}</span>
    </button>
  );
};

export default CartButton;
