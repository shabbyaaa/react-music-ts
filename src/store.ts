import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as recommend from './page/Recommend/store/reducer';
import * as singers from './page/Singers/store/reducer';
import * as rank from './page/Rank/store/reducer';
import * as album from './page/Album/store/reducer';
import * as singer from './page/Singer/store/reducer';
import * as player from './page/Player/store/reducer';
import * as search from './page/Search/store/reducer';


const Reducer = combineReducers({
  recommend: recommend.recommendReducer,
  singers: singers.singersReducer,
  rank: rank.rankReducer,
  album: album.albumReducer,
  singer: singer.singerReducer,
  player: player.playerReducer,
  search: search.searchReducer,
});

type windowWithReduxExtension = Window & typeof globalThis & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function;
}
const composeEnhancers = (window as windowWithReduxExtension).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk];

// redux-logger中间件 触发action事件时可在控制台上打印
// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(require('redux-logger').createLogger())
// }


export const Store = createStore(
  Reducer,
  composeEnhancers(applyMiddleware(...middlewares))
);


export interface RootState {
  recommend: recommend.RecommendStateType,
  singers: singers.SingersStateType,
  rank: rank.RankStateType,
  album: album.AlbumStateType,
  singer: singer.SingerStateType,
  player: player.PlayerStateType,
  search: search.SerachStateType,
}