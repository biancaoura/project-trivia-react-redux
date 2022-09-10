import { getApiTriva } from '../../data/APITrivia';

export const REQUEST_API = 'REQUEST_API';

export const actionApiTrivia = (validAPI) => async (dispatch) => {
  const APITrivia = await getApiTriva();

  dispatch({ type: REQUEST_API, APITrivia: APITrivia.trivia, validAPI });
  localStorage.setItem('token', APITrivia.token.token);
};
