import md5 from 'crypto-js/md5';

const gravatarAPI = async (email) => {
  const emailHash = md5(email).toString();
  const API_URL = `https://www.gravatar.com/avatar/${emailHash}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

export default gravatarAPI;
