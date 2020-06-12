import { combineReducers } from 'redux';
import global from 'reducers/global';

const reducers = combineReducers({
  global,
});

export type AppState = ReturnType<typeof reducers>;
export default reducers;
