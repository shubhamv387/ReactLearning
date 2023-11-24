import { Fragment, useState } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';
import Notification from './components/UI/Notifications';

function App() {
  const [isCartShown, setIsCartShown] = useState(false);

  const notification = useSelector((state) => state.ui.notification);

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
