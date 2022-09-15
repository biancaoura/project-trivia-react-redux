import { SUBMIT_EMAIL, SUBMIT_NAME } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
};

const userInfo = (state = INITIAL_STATE, { type, email, name }) => {
  switch (type) {
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
export default userInfo;
