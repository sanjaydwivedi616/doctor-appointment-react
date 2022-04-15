import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from "../saga/rootSaga"

const sagaMiddleware = createSagaMiddleware();


const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware))
sagaMiddleware.run(rootSaga)

export default store;
