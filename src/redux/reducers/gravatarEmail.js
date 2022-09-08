import { AVATAR_NAME } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const gravatarEmail = (state = INITIAL_STATE, action) => {
  // switch (action.type) {
  // case GET_AVATAR:
  //   return {
  //     ...state,
  //     email: action.payload,
  //   };
  // default:
  //   return state;
  // }
  switch (action.type) {
  case AVATAR_NAME:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default gravatarEmail;
