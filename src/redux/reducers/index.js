import { combineReducers } from 'redux';
import reducerTrivia from './reducerTrivia';
// import assertions from './assertions';
// import gravatarEmail from './gravatarEmail';
// import name from './name';
// import score from './score';

// {
//   name: nome-da-pessoa,
//   assertions: número-de-acertos,
//   score: pontuação,
//   gravatarEmail: email-da-pessoa,
// }

const rootReducer = combineReducers({ reducerTrivia });

export default rootReducer;
