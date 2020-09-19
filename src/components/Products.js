import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addToCart } from "../actions";
import * as selectors from "../reducers";
import Product from "./Product";

const Products = ({ products, addToCart }) => (
  <div>
    <h3>Products</h3>
    <div>
      {products.map((product) => (
        <div key={product.id} style={{ marginBottom: 20 }}>
          <Product
            title={product.title}
            price={product.price}
            quantity={product.inventory}
          />
          <button
            onClick={() => addToCart(product.id)}
            disabled={product.inventory > 0 ? "" : "disabled"}
          >
            {product.inventory > 0 ? "Add to cart" : "Sold Out"}
          </button>
        </div>
      ))}
    </div>
  </div>
);

Products.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      inventory: PropTypes.number.isRequired,
    })
  ).isRequired,
  addToCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  products: selectors.allProductsSelector(state),
});

export default connect(mapStateToProps, { addToCart })(Products);
