import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkout, removeFromCart } from "../actions";
import * as selectors from "../reducers";
import Product from "./Product";

const Cart = ({ products, total, checkout, removeFromCart }) => {
  return (
    <div>
      <h3>Your Cart</h3>
      <div>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id}>
              <Product
                title={product.title}
                price={product.price}
                quantity={product.quantity}
                key={product.id}
              />
              <button onClick={() => removeFromCart(product.id)}>remove</button>
            </div>
          ))
        ) : (
          <em>Please add some products to cart.</em>
        )}
      </div>
      <p>Total: &#36;{total}</p>
      <button
        onClick={() => checkout()}
        disabled={products.length > 0 ? "" : "disabled"}
      >
        Checkout
      </button>
    </div>
  );
};

Cart.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  total: PropTypes.string,
  checkout: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  products: selectors.cartProductsSelector(state),
  total: selectors.totalSelector(state),
});

export default connect(mapStateToProps, { checkout, removeFromCart })(Cart);
