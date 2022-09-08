import { REQUEST_API } from '../actions';

const INITIAL_STATE = {
  trivia: {},
};

const reducerTrivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API: return {
    ...state,
    trivia: action.APITrivia,
  };

  default:
    return state;
  }
};

export default reducerTrivia;
