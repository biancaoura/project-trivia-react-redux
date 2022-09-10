import { REQUEST_API, GRAVATAR_TOKEN } from '../actions';

const INITIAL_STATE = {
  trivia: {},
  token: '',
};

const reducerTrivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API: return {
    ...state,
    trivia: action.APITrivia,
    validAPI: action.validAPI,
  };
  case GRAVATAR_TOKEN:
    return {
      ...state,
      token: action.payload,
    };

  default:
    return state;
  }
};

export default reducerTrivia;
