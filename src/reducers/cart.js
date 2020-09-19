import types from "../types";

const initialState = {
  quantityById: {},
};

const cart = (state = initialState, action) => {
  const { productId } = action;

  switch (action.type) {
    case types.ATC_SUCCESS:
      return {
        ...state,
        quantityById: {
          ...state.quantityById,
          [productId]: (state.quantityById[productId] || 0) + 1,
        },
      };
    case types.RFC_SUCCESS:
      const qty = state.quantityById[productId] - 1;
      const qtyCopy = { ...state.quantityById };
      if (qty > 0) {
        qtyCopy[productId] = qty;
      } else {
        delete qtyCopy[productId];
      }
      return {
        ...state,
        quantityById: qtyCopy,
      };
    case types.CHECKOUT_SUCCESS:
      return initialState;
    case types.CHECKOUT_FAILURE:
      return action.cart;
    default:
      return state;
  }
};

export default cart;
