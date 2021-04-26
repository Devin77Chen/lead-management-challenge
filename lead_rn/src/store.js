import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import reducers from '@reducers';

const composeEnhancers = compose(
    applyMiddleware(logger),
    offline(offlineConfig)
)

const store = createStore(
    reducers,
    {},
    composeEnhancers
)

export default store;