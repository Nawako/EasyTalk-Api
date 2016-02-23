/**
 * FavoriteController
 *
 * @description :: Server-side logic for managing favorites
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getWords: function(req,res) {
    Users.find({id: req.identity.id}).populate('favWord')
      .exec(function (err, user) {
        if (err) {
          return err;
        }
        else {
          res.json(user[0].favWord);
        }
      });
  },
  addFavorites:function(req,res){
    var word = {name:req.body.word};
    var bool = false;
    Word.findOne({name: req.body.word})
      .exec(function (err, word) {
        if(err)
          return res.status(500).json({message:"Unexpected Server Error"});
        else{
          if(word == undefined){
            return res.status(400).json({message:"Word is not in the database!"});
          }else{
            Users.findOne({id: req.identity.id}).populateAll()
              .exec(function (err, user) {
                for(var i=0;i<user.favWord.length;i++){
                  if(user.favWord[i].name == word.name) {
                    bool = true;
                    break;
                  }
                }
                if(bool == true){
                  console.log('true');
                  res.status(400).json({message:"Word is already in the favorite!"});
                }else{
                  console.log('false');
                  user.favWord.add(req.body.word);
                  console.log(user.favWord);
                  user.save(function (err, user){
                    res.json({word:word.name});
                  });
                }
              });
          }
        }
      });
  },
  removeFavorites:function(req,res) {
    var word = {name: req.body.word};
    var bool = false;
    Users.findOne({id: req.identity.id}).populateAll()
      .exec(function (err, user) {
        for (var i = 0; i < user.favWord.length; i++) {
          if (user.favWord[i].name == word.name) {
            bool = true;
            break;
          }
        }
        if (bool == true) {
          user.favWord.remove(req.body.word);
          user.save(function (err, user) {
            res.json({word: word.name});
          });

        } else {
          res.status(400).json({message: "Word is NOT in the favorite!"});
        }
      });
  }
};

