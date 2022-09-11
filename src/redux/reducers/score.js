import { SCORE_PLAYER } from '../actions';

const INITIAL_STATE = {
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SCORE_PLAYER: return {
    ...state,
    score: action.player + state.score,

  };
  default:
    return state;
  }
};

export default player;
