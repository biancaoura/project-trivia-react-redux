import { getApiTrivia } from '../../services/APITrivia';

export const SUBMIT_NAME = 'SUBMIT_NAME';
export const SUBMIT_EMAIL = 'SUBMIT_EMAIL';
export const REQUEST_API = 'REQUEST_API';
export const GET_TRIVIA = 'GET_TRIVIA';
export const SCORE_PLAYER = 'SCORE_PLAYER';
export const CORRECT_ANSWER = 'CORRECT_ANSWER';

export const submitName = (name) => ({ type: SUBMIT_NAME, name });
export const submitEmail = (email) => ({ type: SUBMIT_EMAIL, email });

export const actionScorePlayer = (score) => ({ type: SCORE_PLAYER, score });
export const increaseCorrect = (score) => ({ type: CORRECT_ANSWER, score });

export const actionApiTrivia = () => async (dispatch) => {
  const APITrivia = await getApiTrivia();
  const { trivia, token: { token } } = APITrivia;

  dispatch({ type: REQUEST_API, trivia, token });
  localStorage.setItem('token', token);
};
