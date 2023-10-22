import { useState } from "react";
import "./App.css";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Shoes from "./components/Shoes/Shoes";
import CartProvider from "./context/CartProvider";
import ShoeProvider from "./context/ShoeProvider";
import { Flip, Slide, ToastContainer, Zoom } from "react-toastify";

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
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Slide}
        />
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
