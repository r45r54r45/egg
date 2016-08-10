var express = require('express');
var router = express.Router();
var models = require('../models');

router.get("/",function(req,res,next){
   var user=req.query.user;
   
});

module.exports = router;