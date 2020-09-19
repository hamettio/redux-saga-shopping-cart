import types from "../types";

const products = (state = {}, action) => {
  const { productId } = action;

  switch (action.type) {
    case types.ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        // converting array to object for faster coding base on redux example source code
        ...action.products.reduce(
          (obj, product) => ({
            ...obj,
            [product.id]: product,
          }),
          {}
        ),
      };
    case types.ATC_SUCCESS:
      return {
        ...state,
        [productId]: {
          ...state[productId],
          inventory: state[productId].inventory - 1,
        },
      };
    case types.RFC_SUCCESS:
      return {
        ...state,
        [productId]: {
          ...state[productId],
          inventory: state[productId].inventory + 1,
        },
      };
    default:
      return state;
  }
};

export default products;
