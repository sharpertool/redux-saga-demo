// 🏬 CREATE STORE
import createSagaMiddleware from 'redux-saga'
import {createStore, compose, applyMiddleware} from 'redux'

import rootReducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

