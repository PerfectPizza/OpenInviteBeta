const axios = require('axios');

exports.getUserData = async accessToken =>
  axios.get(`https://graph.facebook.com/v2.9/me?fields=friends%2Cpicture&access_token=${accessToken}`)
    .then(({ data: response }) => ({
      friends: response.friends.data,
      picture: response.picture.data.url,
    }))
    .catch(err => console.error('error getting friends', err));

