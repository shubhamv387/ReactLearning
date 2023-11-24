import { Fragment, useEffect, useState } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './components/UI/Notifications';
import { fetchCartData, sendCartData } from './store/cartSlice';

let isInitial = true;

function App() {
  const [isCartShown, setIsCartShown] = useState(false);

  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartData());
  }, []);

  useEffect(() => {
    if (!isInitial) {
      dispatch(sendCartData(cart));
    } else isInitial = false;
  }, [cart]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout setIsCartShown={setIsCartShown} isCartShown={isCartShown}>
        {isCartShown && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
