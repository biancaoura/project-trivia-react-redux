import { SUBMIT_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const gravatarEmail = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default gravatarEmail;
