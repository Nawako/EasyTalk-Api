/**
 * 400 (Bad Request) Handler
 *
 * Usage:
 * return res.badRequest();
 * return res.badRequest(data);
 * return res.badRequest(data, 'some/specific/badRequest/view');
 *
 * e.g.:
 * ```
 * return res.badRequest(
 *   'Please choose a valid `password` (6-12 characters)',
 *   'trial/signup'
 * );
 * ```
 */

module.exports = function badRequest(data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Set status code
  res.status(400);

  // Log error to console
  if (data !== undefined) {
    sails.log.verbose('Sending 400 ("Bad Request") response: \n',data);
  }
  else sails.log.verbose('Sending 400 ("Bad Request") response');

  if (sails.config.environment === 'production') {
    data = undefined;
  }

  if (req.wantsJSON) {
    return res.jsonx(data);
  }

  options = (typeof options === 'string') ? { view: options } : options || {};

  if (options.view) {
    return res.view(options.view, { data: data });
  }

  else return res.guessView({ data: data }, function couldNotGuessView () {
    return res.jsonx(data);
  });

};

