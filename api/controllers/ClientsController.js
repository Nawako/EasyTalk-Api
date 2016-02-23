/**
 * ClientsController
 *
 * @description :: Server-side logic for managing clients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  register: function(req,res){
    Clients.findOne({name: req.body.name})
      .exec(function (err, clients) {
        if (err) {
          res.status(500).json({message: "Unexpected Server Error contact the admin!"});
        } else {
          if (clients == undefined) {
            Clients.create({name: req.body.name,client_id: Tokens.generateTokenString(),
              client_secret: Tokens.generateTokenString()})
              .exec(function (err, client) {
                return res.json(client);
              });
          } else {
            return res.status(400).json({message: "Client name has already been taken!"});
          }
        }
      });
  }
};
