import { useContext } from 'react';
import classes from './MedItem.module.css';
import CartContext from '../../../context/cart-context';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MedItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  const cartCtx = useContext(CartContext);

  const buyHandler = () => {
    const existingCartItem = cartCtx.items.find((item) => item.id === props.id);

    if (existingCartItem)
      return toast.warn('Item already in the cart', { position: 'top-center' });

    cartCtx.addItem({
      name: props.name,
      id: props.id,
      qty: 1,
      price: props.price,
    });
  };

  return (
    <li className={classes.Med}>
      <div className={classes.medData}>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>

      <div className={classes.form}>
        <button onClick={buyHandler}>Add to cart</button>
      </div>
    </li>
  );
};

export default MedItem;
