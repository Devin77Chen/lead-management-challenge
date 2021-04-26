import { applyMiddleware, compose, createStore } from 'redux';
import createLogger from 'redux-logger';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import reducers from '@reducers';

const logger = createLogger();
const middleware = __DEV__ ? [logger] : [];
const composeEnhancers = compose(
    applyMiddleware(...middleware),
    offline(offlineConfig)
)

const store = createStore(
    reducers,
    {},
    composeEnhancers
)

export default store;