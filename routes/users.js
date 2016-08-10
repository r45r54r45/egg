var express = require('express');
var router = express.Router();
var path = require("path");
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
module.exports = router;
