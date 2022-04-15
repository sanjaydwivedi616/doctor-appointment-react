import { all } from "redux-saga/effects"
import { productsWatcherSaga } from "./addSlotSaga";

export function* rootSaga() {
    yield all([
        productsWatcherSaga()
    ])
}

