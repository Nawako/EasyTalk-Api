/**
 * Created by IT3 on 2/3/2016.
 */
module.exports = function (req, res, next) {
  OAuth.authenticator.authenticate(
    ['oauth2-public-client'],
    { session: false })(req,res,next);
};
