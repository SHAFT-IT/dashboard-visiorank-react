import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers'
import thunk from 'redux-thunk'

export default function configureStore() {
    const store = createStore(reducers, applyMiddleware(thunk))
    if (module.hot) {
        module.hot.accept(() => {
            const nextRootReducer = require('./reducers').default
            store.replaceReducer(nextRootReducer)
        });
    }
    return store;
};
