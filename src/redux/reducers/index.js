import { combineReducers } from 'redux';
import reducerTrivia from './reducerTrivia';
import gravatarEmail from './gravatarEmail';
import name from './name';
import player from './score';

const rootReducer = combineReducers({ reducerTrivia, name, gravatarEmail, player });

export default rootReducer;
