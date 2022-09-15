import { combineReducers } from 'redux';
import reducerTrivia from './reducerTrivia';
import player from './player';

const rootReducer = combineReducers({ reducerTrivia, player });

export default rootReducer;
