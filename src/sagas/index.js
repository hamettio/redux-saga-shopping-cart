import types from "../types";
import { put, all, fork, take, select, takeEvery } from "redux-saga/effects";
import api from "../api";
import * as actions from "../actions";

// Sagas
function* getAllProductsSaga() {
  const products = yield api.getProducts();
  yield put(actions.getAllProducts(products));
}

function* addToCartSaga() {
  while (true) {
    const { productId } = yield take(types.ATC_REQUEST);
    const inventory = yield select(
      (state) => state.products[productId].inventory
    );
    if (inventory > 0) {
      yield put({ type: types.ATC_SUCCESS, productId });
    }
  }
}

function* removeFromCartSaga() {
  while (true) {
    const { productId } = yield take(types.RFC_REQUEST);
    const inventory = yield select(
      (state) => state.products[productId].inventory
    );
    if (inventory >= 0) {
      yield put({ type: types.RFC_SUCCESS, productId });
    }
  }
}

function* checkoutSaga() {
  yield put({ type: types.CHECKOUT_SUCCESS });
}

function* checkoutWatcher() {
  yield takeEvery(types.CHECKOUT_REQUEST, checkoutSaga);
}

export default function* rootSagas() {
  yield all([
    fork(getAllProductsSaga),
    fork(addToCartSaga),
    fork(removeFromCartSaga),
    fork(checkoutWatcher),
  ]);
}
