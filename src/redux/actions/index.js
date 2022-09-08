import gravatarAPI from '../../services/gravatarAPI';

export const GET_AVATAR = 'GET_AVATAR';
export const SUBMIT_NAME = 'SUBMIT_NAME';

const getAvatar = (payload) => ({ type: GET_AVATAR, payload });

export const submitName = (payload) => ({ type: SUBMIT_NAME, payload });

export const fetchAPI = (email) => async (dispatch) => {
  const avatar = await gravatarAPI(email);
  dispatch(getAvatar(avatar));
};

export const AVATAR_NAME = 'AVATAR_NAME';

export const avatarName = (payload) => ({
  type: AVATAR_NAME,
  email: `https://www.gravatar.com/avatar/${payload}`,
});
