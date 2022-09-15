import { REQUEST_API, GRAVATAR_TOKEN } from '../actions';

const INITIAL_STATE = {
  trivia: {},
  token: '',
};

const reducerTrivia = (state = INITIAL_STATE, { type, trivia, token }) => {
  switch (type) {
  case REQUEST_API:
    return {
      ...state,
      trivia,
    };
  case GRAVATAR_TOKEN:
    return {
      ...state,
      token,
    };
  default:
    return state;
  }
};

export default reducerTrivia;
