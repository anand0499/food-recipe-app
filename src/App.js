import { useState } from 'react';
import Cart from './Compoents/Cart/Cart';
import Header from './Compoents/Layout/Header'
import Meals from './Compoents/Meals/Meals';
import CartProvider from './Store/CartProvider';

function App() {
  const [cartIsShown,setCartIsShown]=useState(false)

  const showCartHandler=()=>{
    setCartIsShown(true);
  }

  const hideCartHandler=()=>{
    setCartIsShown(false);
  }

  return (
    <CartProvider>
     { cartIsShown &&  <Cart onCloseCart={hideCartHandler} /> }
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;