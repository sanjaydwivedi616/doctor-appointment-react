import { postDataApi } from "../apiCall/api";
import { call, takeEvery, takeLatest, cancelled } from "redux-saga/effects";
import { ADD_SLOT } from "../redux/type/actionType";
import axios from "axios";


export function* productsWorkerSaga(action) {
    let cancelTokenSource = axios.CancelToken.source()
    console.log(cancelTokenSource)
    try {
        const res = yield call(postDataApi, "appointmentRequest", action.payload, { cancelToken: cancelTokenSource.token })
        //const res = yield call(postDataApi, "appointmentRequest", action.payload)
        console.log(res.data)
    } catch (error) {
        console.log(error)
    } finally {
        if (yield cancelled()) {
            console.log("Call is canceld");
            cancelTokenSource.cancel("call is cancel request");
        }
    }
}

export function* productsWatcherSaga() {

    // yield takeEvery(ADD_SLOT, productsWorkerSaga)
    yield takeLatest(ADD_SLOT, productsWorkerSaga)
}

