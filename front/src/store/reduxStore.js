import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import rootSaga from "./sagas";

export const configureStore = () => {
  const composeEnhancers = 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  if (module.hot) {
    module.hot.accept(reducers, () => store.replaceReducer(reducers.default));
  }

  sagaMiddleware.run(rootSaga)

  return store;
};
