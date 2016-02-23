/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create:function(req,res,next){
    Category.findOne({name: req.body.name})
      .exec(function (err, category) {
        if(err){
          res.status(500).json({message:"Unexpected Server Error contact the admin!"});
        }else{
          if(category == undefined){
            Category.create({name: req.body.name})
              .exec(function (err, category) {
               return res.json(category);
              });
          }else{
            return res.status(400).json({message:"Category name has already been taken!"});
          }

        }
      });
  }
};

