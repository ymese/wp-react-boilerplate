import promise from 'react-promise';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';

const createStoreWithMiddleWare = compose(applyMiddleware(
    promise
))(createStore);

export default store = createStoreWithMiddleWare(reducers);
