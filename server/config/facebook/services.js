const { OAuth2 } = require('oauth');

const fbAuth = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET,
  'https://graph.facebook.com',
  null, 'oauth2/token', null);

exports.getFriends = (userKey, profile) => {
  fbAuth.get(`https://graph.facebook.com/${profile}/friends?redirect=false`,
    userKey, (error, results) =>
      error 
      ? console.error('getFriends error', error)
      : JSON.parse(results).data
  );
};
