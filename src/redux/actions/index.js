import { getApiTriva } from '../../data/APITrivia';

export const REQUEST_API = 'REQUEST_API';

export const actionApiTrivia = () => async (dispatch) => {
  const APITrivia = await getApiTriva();
  console.log(APITrivia);
  dispatch({ type: REQUEST_API, APITrivia: APITrivia.trivia });
  localStorage.setItem('token', APITrivia.token.token);
};
