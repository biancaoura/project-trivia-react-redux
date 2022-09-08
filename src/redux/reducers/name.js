import { SUBMIT_NAME } from '../actions';

const INITIAL_STATE = {
  name: '',
};

const name = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_NAME:
    return {
      ...state,
      name: action.payload,
    };
  default:
    return state;
  }
};

export default name;
