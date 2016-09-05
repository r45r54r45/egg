var express = require('express');
var router = express.Router();
var path = require("path");
var models = require('../models');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/../views/form.html'));
});
router.post('/login', function (req, res, next) {
    models.User.count({
        where:{
            school_num: req.body.id
        }
    }).then(function(count){
        if(count!=0){
            res.json({login:true});
        }else{
            res.json({login:false});
        }
    });
});
router.post('/register', function (req, res, next) {
    models.User.findOrCreate({
        where: {
            school_num: req.body.school_num
        },
        defaults: {
            push_id: req.body.push_id,
            major: req.body.major,
            username: req.body.username
        }
    }).spread(function (user, created) {
        res.json({
            result: created,
            data: user.get({
                plain: true
            })
        });
    });

});
module.exports = router;
