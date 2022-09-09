import { getApiTriva } from '../../data/APITrivia';

// export const GET_AVATAR = 'GET_AVATAR';
export const SUBMIT_NAME = 'SUBMIT_NAME';
export const GRAVATAR_TOKEN = 'GRAVATAR_TOKEN';
export const SUBMIT_EMAIL = 'SUBMIT_EMAIL';
export const REQUEST_API = 'REQUEST_API';

export const submitName = (payload) => ({ type: SUBMIT_NAME, payload });
export const submitEmail = (payload) => ({ type: SUBMIT_EMAIL, payload });

// criar action para score e assertions
// observar como tratar a incrementação dos casos

export const gravatarToken = (payload) => ({
  type: GRAVATAR_TOKEN,
  payload,
});

export const actionApiTrivia = () => async (dispatch) => {
  const APITrivia = await getApiTriva();
  console.log(APITrivia);
  dispatch({ type: REQUEST_API, APITrivia: APITrivia.trivia });
  localStorage.setItem('token', APITrivia.token.token);
  dispatch(gravatarToken(APITrivia.token.token));
};
