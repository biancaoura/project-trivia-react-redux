import { SCORE_PLAYER, CORRECT_ANSWER, SUBMIT_EMAIL, SUBMIT_NAME } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, { type, name, email, score }) => {
  switch (type) {
  case SCORE_PLAYER:
    return {
      ...state,
      score: score + state.score,
    };
  case CORRECT_ANSWER:
    return {
      ...state,
      assertions: score + state.assertions,
    };
  case SUBMIT_EMAIL:
    return {
      ...state,
      email,
    };
  case SUBMIT_NAME:
    return {
      ...state,
      name,
    };
  default:
    return state;
  }
};

export default player;
