/**
* Users.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var promisify = require('bluebird').promisify,
  bcrypt = require('bcrypt-nodejs');
module.exports = {
  attributes: {
    username: {
      type: 'string',
      unique: true,
      required: true
    },

    password: {
      type: 'string',
      required: true,
      columnName: 'encrypted_password',
      minLength: 8
    },

    favWord:{
      collection:'Word',
      via:'favorite'
    },

    date_registered: {
      type: 'date'
    },

    comparePassword: function(password) {
      return bcrypt.compareSync(password, this.password);
    },

    toJSON: function() {

      var obj = this.toObject();
      delete obj.password;

      return obj;
    }

  },

  beforeCreate: function(user, next) {
    if (user.hasOwnProperty('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
      next(false, user);

    } else {
      next(null, user);
    }
  },


  beforeUpdate: function(user, next) {
    if (user.hasOwnProperty('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
      next(false, user);
    } else {
      next(null, user);
    }
  },

  authenticate: function (username, password) {
    return API.Model(Users).findOne({username: username}).then(function(user){
      return (user && user.comparePassword(password))? user : null;
    });
  }

};
