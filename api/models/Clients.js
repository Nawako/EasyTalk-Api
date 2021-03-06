/**
* Clients.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var promisify = require('bluebird').promisify,
  bcrypt = require('bcrypt-nodejs');
module.exports = {


  attributes: {
    name: {
      unique: true,
      type: 'string'
    },

    client_id: {
      type: 'string',
      required: true,
      unique: true
    },

    client_secret: {
      type: 'string',
      required: true
    },

    redirect_uri: {
      type: 'string',
      urlish: true
    },

    date_registered: {
      type: 'string'
    },

    compareSecret: function(clientSecret) {
      return bcrypt.compareSync(clientSecret, this.client_secret);
    },

    toJSON: function () {
      var obj = this.toObject();
      delete obj.client_secret;

      return obj;
    }

  },


  beforeCreate: function (client, next) {
    if (client.hasOwnProperty('client_secret')) {
      client.clientSecret = bcrypt.hashSync(client.client_secret, bcrypt.genSaltSync(10));
      next(false, client);

    } else {
      next(null, client);
    }
  },

  beforeUpdate: function (client, next) {
    if (client.hasOwnProperty('client_secret')) {
      client.clientSecret = bcrypt.hashSync(client.client_secret, bcrypt.genSaltSync(10));
      next(false, client);
    } else {
      next(null, client);
    }
  },


  authenticate: function (clientId, clientSecret) {
    return API.Model(Clients).findOne({client_id: clientId}).then(function (client) {
      return (client && client.compareSecret(clientSecret) ) ? client : null;
    });
  }

};

