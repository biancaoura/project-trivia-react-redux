import { GET_AVATAR } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const gravatarEmail = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_AVATAR:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default gravatarEmail;
