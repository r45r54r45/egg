var express = require('express');
var router = express.Router();
var models = require('../models');

router.post("/list/:start",function(req,res,next){
   var uid=req.body.user;
   models.User.findOne({
      where:{
         id: uid
      },
      attributes:['major']
   }).then(function(maj){
      var major=maj.dataValues.major;
      models.Notice.findAll({
         where:{
            target: {
               $like: '%'+major+'%'
            }
         },
         attributes: ['title','image','body','createdAt'],
         order:[['createdAt','desc']],
         limit:10,
         offset: req.params.start
      }).then(function(list){
         res.json(list);
      })
   });
});

module.exports = router;