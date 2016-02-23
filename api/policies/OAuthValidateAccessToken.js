/**
 * Created by IT3 on 2/3/2016.
 */
module.exports = function (req, res, next) {
  OAuth.authenticator.authenticate('bearer', { session: false }, function(err,identity,authorization) {
    if (!identity ) return res.send(401);

    req.identity = identity;
    req.authorization = authorization;

    next();
  })(req,res);
};
