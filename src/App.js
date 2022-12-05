import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/ContexProvider";

function App() {
  const [cartIsShown, setIsShown] = useState(false);

  const showCartHandler = () => {
    setIsShown(true);
  };

  const closeCart = () => {
    setIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={closeCart} />}
      <Header onShownCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
