import { SCORE_PLAYER, CORRECT_ANSWER } from '../actions';

const INITIAL_STATE = {
  score: 0,
  correctAnswers: 0,
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
      correctAnswers: action.score + state.correctAnswers,
    };
  default:
    return state;
  }
};

export default player;
