import { getApiTrivia } from '../../services/APITrivia';

export const SUBMIT_NAME = 'SUBMIT_NAME';
export const GRAVATAR_TOKEN = 'GRAVATAR_TOKEN';
export const SUBMIT_EMAIL = 'SUBMIT_EMAIL';
export const REQUEST_API = 'REQUEST_API';
export const GET_TRIVIA = 'GET_TRIVIA';
export const SCORE_PLAYER = 'SCORE_PLAYER';
export const CORRECT_ANSWER = 'CORRECT_ANSWER';

export const submitName = (payload) => ({ type: SUBMIT_NAME, payload });
export const submitEmail = (payload) => ({ type: SUBMIT_EMAIL, payload });

export const gravatarToken = (token) => ({ type: GRAVATAR_TOKEN, token });

export const actionApiTrivia = () => async (dispatch) => {
  const APITrivia = await getApiTrivia();
  const { trivia, token: { token } } = APITrivia;

  dispatch({ type: REQUEST_API, trivia });
  localStorage.setItem('token', token);
  dispatch(gravatarToken(token));
};

export const actionTrivia = () => async (dispatch) => {
  const APITrivia = await getApiTrivia();
  const validAPI = APITrivia.trivia.response_code;

  dispatch({ type: GET_TRIVIA, trivia: validAPI });
};

export const actionScorePlayer = (score) => ({ type: SCORE_PLAYER, score });
export const increaseCorrect = (score) => ({ type: CORRECT_ANSWER, score });
