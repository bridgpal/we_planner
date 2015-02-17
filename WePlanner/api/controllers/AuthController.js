var bcrypt = require('bcrypt');

module.exports = {

  login:function(req,res){
    User.findOne({where:{email:req.body.email}})
    .exec(function(err,user){
      if(err) return res.send(err);
      if(user){
        bcrypt.compare(req.body.password,user.password,function(err,match){
          // if(err) return res.send(err);
          if(match){
            req.session.user=user;
            res.send({result:true,user:user});
          } else {
            res.send({
              result:false,
              error:'Incorrect password.'
            })
          }
        })
      } else {
        res.send({
          result:false,
          error:'User not found.'
        })
      }
    })
  },

  logout:function(req,res){
    delete req.session.user;
    res.send({result:true});
  },

  check:function(req,res){
    res.send({
      user: (req.session.user || false)
    });
  }


};