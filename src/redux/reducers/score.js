import { SCORE_PLAYER, CORRECT_ANSWER } from '../actions';

const INITIAL_STATE = {
  score: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SCORE_PLAYER:
    return {
      ...state,
      score: action.score + state.score,
    };
  case CORRECT_ANSWER:
    return {
      ...state,
      assertions: action.score + state.assertions,
    };
  default:
    return state;
  }
};

export default player;
