import { combineReducers } from 'redux';
import assertions from './assertions';
import gravatarEmail from './gravatarEmail';
import name from './name';
import score from './score';

// {
//   name: nome-da-pessoa,
//   assertions: número-de-acertos,
//   score: pontuação,
//   gravatarEmail: email-da-pessoa,
// }

const rootReducer = combineReducers({ assertions, gravatarEmail, name, score });

export default rootReducer;
