const axios = require('axios');

exports.getFriends = async accessToken =>
  axios.get(`https://graph.facebook.com/v2.9/me?fields=friends&access_token=${accessToken}`)
    .then(({ data: response }) => response.friends.data)
    .catch(err => console.error('error getting friends', err));

