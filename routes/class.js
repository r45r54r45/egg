var express = require('express');
var sequelize = require('sequelize');
var router = express.Router();
var models = require('../models');
var Assess = models.Assess;
var Class = models.Class;
var Comment = models.Assess_comment;
/* GET home page. */
router.get('/points/:id', function (req, res, next) {

});

router.get("/list/all/:start", function (req, res, next) {
    models.sequelize.query("SELECT `Classes`.*, " +
        "Avg(`professor_rate`) AS `avg_prof`,Avg(`difficulty`)  AS `avg_diff`,100*Avg(`Assesses`.`professor`) AS `avg_again`," +
        "Avg(`rating`) AS `rating` " +
        "FROM" +
        " (SELECT `Classes`.`id`,`Classes`.`title`,`Classes`.`professor` " +
        " FROM   `Classes` AS `Classes`" +
        " ORDER  BY `createdat` DESC" +
        " LIMIT  " + req.params.start + ", 10) AS `Classes` " +
        "LEFT OUTER JOIN `Assesses` AS `Assesses`" +
        " ON `Classes`.`id` = `Assesses`.`ClassId`" +
        " GROUP BY `Classes`.`id`;", {type: models.sequelize.QueryTypes.SELECT})
        .then(function (classes) {
            res.json(classes);
        });
});
router.get("/watch/:classId", function (req, res, next) {
    var addObject = function () {
        var ret = {};
        var len = arguments.length;
        for (var i = 0; i < len; i++) {
            for (p in arguments[i]) {
                if (arguments[i].hasOwnProperty(p)) {
                    ret[p] = arguments[i][p];
                }
            }
        }
        return ret;
    }
    models.sequelize.query("SELECT `Classes`.*, " +
        "Avg(`professor_rate`) AS `avg_prof`,Avg(`difficulty`)  AS `avg_diff`,100*Avg(`Assesses`.`professor`) AS `avg_again`," +
        "Avg(`rating`) AS `rating` " +
        "FROM" +
        " (SELECT `Classes`.`id`,`Classes`.`title`,`Classes`.`professor` " +
        " FROM   `Classes` AS `Classes` where `Classes`.`id`=" + req.params.classId +
        " ORDER  BY `createdat` DESC" +
        " LIMIT 0,1) AS `Classes` " +
        "LEFT OUTER JOIN `Assesses` AS `Assesses`" +
        " ON `Classes`.`id` = `Assesses`.`ClassId`" +
        " GROUP BY `Classes`.`id`;", {type: models.sequelize.QueryTypes.SELECT})
        .then(function (res1) {
            Class.findOne({
                where: {
                    id: req.params.classId
                },
                include: [{
                    model: Assess,
                    limit: 0,
                    attributes: ['attendance', 'grade', 'capacity', 'tags']
                }],
                attributes: []
            }).then(function (res2) {
                var result = {};
                result.basic = res1[0];
                result.info = res2.Assesses[0];
                //TODO need fix here. For info part, majority item should be counted
                var mySet = new Set();
                res2.Assesses.forEach(function (item, index) {
                    item.tags.split(",").forEach(function (it, ind) {
                        mySet.add(it);
                    });
                });
                var iterator = mySet.entries();
                var temp;
                result.tags = [];
                while (temp = iterator.next().value) {
                    result.tags.push(temp[0]);
                }
                res.json(result);
            });
        });
});

router.get("/comment/:assessId/:start", function (req, res, next) {
    Comment.findAll({
        where: {
            AssessId: req.params.assessId
        },
        limit: 10,
        offset: req.params.start,
        attributes: ['createdAt','comment']
    }).then(function(result){
        res.json(result);
    })
});

router.get("/assess/:classId/:start",function(req,res,next){
   Assess.findAll({
       where:{
           classId:req.params.classId
       },
       limit:10,
       offset:req.params.start,
       attributes:['rating','heart','comment','describe','id']
   }).then(function(result){
       res.json(result);
   })
});
router.post("/assess/comment",function(req,res,next){
    Comment.create({
        AssessId:req.body.assessId,
        UserId:req.body.uid,
        comment:req.body.comment
    }).then(function(){
        Assess.findOne({
            where: {
                id: req.body.assessId
            }
        }).then(function (assess) {
            assess.increment('comment', {by: 1}).then(function(){
                res.json({result:true});
            });
        });
    });
});
router.post("/assess/heart",function(req,res,next){
    Assess.findOne({
        where: {
                id: req.body.assessId
        }
    }).then(function (assess) {
        assess.increment('heart', {by: 1}).then(function(){
            res.json({result:true});
        });
    });
    //TODO check if user pressed like before
});
router.post("/assess",function(req,res,next){
    var data=req.body;
    Assess.create({
        professor_rate:data.professor_rate,
        difficulty:data.difficulty,
        professor:data.professor,
        attendance:data.attendance,
        grade: data.grade,
        capacity:data.capacity,
        tags:data.tags,
        describe: data.describe,
        rating:data.rating,
        UserId:data.userId,
        ClassId:data.classId
    });
});

module.exports = router;
