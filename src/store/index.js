import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers'
import thunk from 'redux-thunk'

const store = createStore(reducers, applyMiddleware(thunk))

store.subscribe(() => {
    console.log('0====>login state', store.getState().login);
})

export default store;