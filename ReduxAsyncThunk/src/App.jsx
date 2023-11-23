import { useState } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
  const [isCartShown, setIsCartShown] = useState(false);

  return (
    <Layout setIsCartShown={setIsCartShown} isCartShown={isCartShown}>
      {isCartShown && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
