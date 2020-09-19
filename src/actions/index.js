import types from "../types";

export const getAllProducts = (products) => ({
  type: types.ALL_PRODUCTS_SUCCESS,
  products,
});

export const addToCart = (productId) => ({
  type: types.ATC_REQUEST,
  productId,
});

export const removeFromCart = (productId) => ({
  type: types.RFC_REQUEST,
  productId,
});

export const checkout = () => ({
  type: types.CHECKOUT_REQUEST,
});
