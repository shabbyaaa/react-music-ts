import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as recommend from './page/Recommend/store/reducer';

const Reducer = combineReducers({
  recommend: recommend.recommendReducer,
});

type windowWithReduxExtension = Window & typeof globalThis & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function;
}
const composeEnhancers = (window as windowWithReduxExtension).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(require('redux-logger').createLogger())
}


export const Store = createStore(
  Reducer,
  composeEnhancers(applyMiddleware(...middlewares))
);


export interface RootState {
  recommend: recommend.RecommendStateType
}