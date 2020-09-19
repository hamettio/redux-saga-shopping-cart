import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Products from "./components/Products";
import Cart from "./components/Cart";

function App() {
  return (
    <Provider store={store}>
      <div>
        <h2>Shopping Cart Example</h2>
        <hr />
        <Products />
        <hr />
        <Cart />
      </div>
    </Provider>
  );
}

export default App;
