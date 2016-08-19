var express = require('express');
var router = express.Router();
var path = require("path");
var models = require('../models');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/../views/form.html'));
});
router.post('/login', function (req, res, next) {
    var Horseman = require('node-horseman');
    var horseman = new Horseman();
    var num=0;
    horseman
        .on("urlChanged",function(url){
            if(url=="https://ysweb.yonsei.ac.kr/busTest/notice2.jsp"){
                num++;
            }
        })
        .open('https://ysweb.yonsei.ac.kr/ysbus.jsp')
        .type('input[id="id"]', req.body.id)
        .type('input[id="password"]', req.body.pw)
        .click('.submit>a')
        .wait(2000)
        .then(function(){
            horseman.close();
            if(num==1){
                res.json({login:true});
            }else{
                res.json({login:false});
            }
        })
});
router.post('/register',function(req,res,next){
    models.User.create({
        push_id: req.body.push_id,
        major: req.body.major,
        school_num: req.school_num,
        username: req.body.username
    }).then(function(data){
        res.json({result:true,data: data.dataValues});
    },function(){
        res.json({result:false});
    })
});
module.exports = router;
