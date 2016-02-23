/**
 * WordController
 *
 * @description :: Server-side logic for managing words
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create:function(req,res,next){
    Word.findOne({name: req.body.name})
      .exec(function (err, user) {
        if(err){
          return res.status(500).json({message:"Unexpected Server Error"});
        }else{
          if(user == undefined){
            Category.findOne({name: req.body.category})
              .exec(function (err, category) {
                if(err){
                  return res.status(500).json({message:"Unexpected Server Error"});
                }else{
                  if(category == undefined){
                    return res.status(400).json({message:"No category name found: "+req.body.category});
                  }else{
                    Word.create({name: req.body.name,category:req.body.category})
                      .exec(function (err, user) {
                        return res.json(user);
                      });
                  }
                }
              });
          }else{
            return res.status(400).send({message:"Word "+req.body.name +" has already in the database!"});
          }
        }
      });
  }
};

