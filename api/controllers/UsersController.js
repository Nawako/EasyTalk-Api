/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  register: function(req,res){
    Users.findOne({username: req.body.username})
      .exec(function (err, user) {
        if (err) {
          res.status(500).json({message: "Unexpected Server Error contact the admin!"});
        } else {
          if (user == undefined) {
            Users.create({username: req.body.username,password:req.body.password,date_registered: new Date()})
              .exec(function (err, user) {
                return res.json(user);
              });
          } else {
            return res.status(400).json({message: "Username has already been taken!"});
          }

        }
      });
  },
  current: function(req,res){
    API(Registration.currentUser,req,res);
  }
};

