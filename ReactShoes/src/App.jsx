import { useState } from "react";
import "./App.css";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Shoes from "./components/Shoes/Shoes";
import CartProvider from "./context/CartProvider";
import ShoeProvider from "./context/ShoeProvider";

const App = () => {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <ShoeProvider>
      <CartProvider>
        {cartIsShown && <Cart onHideCart={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <main>
          <Shoes />
        </main>
      </CartProvider>
    </ShoeProvider>
  );
};

export default App;
