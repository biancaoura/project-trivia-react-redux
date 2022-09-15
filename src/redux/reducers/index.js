import { combineReducers } from 'redux';
import reducerTrivia from './reducerTrivia';
import userInfo from './userInfo';
import player from './score';

const rootReducer = combineReducers({ reducerTrivia, userInfo, player });

export default rootReducer;
