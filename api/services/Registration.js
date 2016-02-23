/**
 * Created by IT3 on 2/3/2016.
 */
var Promise = require('bluebird');

module.exports = {
  currentUser: function (data, context) {
    return context.identity;
  }
};
