import { compose, createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import { rootEpic, rootReducer } from './modules/root';

const epicMiddleware = createEpicMiddleware();
const logger = createLogger({
  duration: true,
});

const middleware = [epicMiddleware, logger];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware)),
  );

  epicMiddleware.run(rootEpic);

  return store;
}
