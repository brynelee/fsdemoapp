import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';

import loginReducer from './pages/login/authenticationReducer';

const reducer = combineReducers({
	logins: loginReducer
});

const middlewares = [thunkMiddleware];
/* if (process.env.NODE_ENV !== 'production'){
	middlewares.push(require('redux-immutable-state-invariant')());
} */

const storeEnhancers = compose(applyMiddleware(...middlewares));

export default createStore(reducer, {}, storeEnhancers);
