export const getToken = async () => {
  const fetchToken = await fetch('https://opentdb.com/api_token.php?command=request');
  const token = await fetchToken.json();
  return token;
};

export const getApiTriva = async () => {
  const token = await getToken();
  const fetchTrivia = await fetch(`https://opentdb.com/api.php?amount=5&token=${token.token}`);
  const trivia = await fetchTrivia.json();
  const result = { trivia, token };
  return result;
};
