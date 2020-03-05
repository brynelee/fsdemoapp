import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';

import {reducer as loginReducer} from './pages/login';
import {reducer as productReducer} from './pages/productlist';

const reducer = combineReducers({
	logins: loginReducer,
	product: productReducer
});

const middlewares = [thunkMiddleware];
/* if (process.env.NODE_ENV !== 'production'){
	middlewares.push(require('redux-immutable-state-invariant')());
} */

const storeEnhancers = compose(applyMiddleware(...middlewares));

export default createStore(reducer, {}, storeEnhancers);
