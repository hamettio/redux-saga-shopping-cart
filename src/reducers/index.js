import { combineReducers } from "redux";
import cart from "./cart";
import products from "./products";

export default combineReducers({
  cart,
  products,
});

// products selectors
export const allProductsSelector = (state) => Object.values(state.products);
const productSelector = (state, id) => state.products[id];

// cart selectors
const addedIdsSelector = (state) => Object.keys(state.cart.quantityById);
const quantitySelector = (state, id) => state.cart.quantityById[id] || 0;

export const totalSelector = (state) =>
  addedIdsSelector(state)
    .reduce(
      (total, id) =>
        total + productSelector(state, id).price * quantitySelector(state, id),
      0
    )
    .toFixed(2);

export const cartProductsSelector = (state) =>
  addedIdsSelector(state).map((id) => ({
    ...productSelector(state, id),
    quantity: quantitySelector(state, id),
  }));
