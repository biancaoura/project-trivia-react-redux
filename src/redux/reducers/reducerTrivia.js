import { REQUEST_API } from '../actions';

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
      token,
    };
  default:
    return state;
  }
};

export default reducerTrivia;
