import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
// import rootSaga from "./saga/index";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,
  composeEnhancer(applyMiddleware(sagaMiddleware)));

// sagaMiddleware.run(rootSaga);

// TODO: remove this when releasing the app.
window.$store = store;

export default store;