var express = require('express');
var router = express.Router();
var models = require('../models');
var csv = require('csv-parser');
var fs = require('fs');
var multer = require('multer');
var storage=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload=multer({
    storage: storage
});

router.post("/class", upload.single("file"), function (req, res, next) {
    fs.createReadStream("./uploads/"+req.file.originalname)
        .pipe(csv())
        .on('data', function (data) {
            models.Class.create({
                category: req.body.category,
                year: req.body.year,
                semester: req.body.semester,
                title: data.title,
                professor: data.professor,
            });
        });
});

router.post("/notice",function(req,res,next){
    var _res=res;
    var target=req.body.target.split(",");
    models.Notice.create({
        title: req.body.title,
        image: req.body.image,
        body: req.body.body,
        target: req.body.target
    }).then(function(result){
        models.User.findAll({
            attributes: ['push_id'],
            where: {
                major: {
                    $in: target
                }
            }
        }).then(function(data){

            var target=[];
            data.forEach(function(item, index){
                target.push(item.dataValues.push_id);
            });
            console.log(target);
            var sendNotification = function(data) {
                var headers = {
                    "Content-Type": "application/json",
                    "Authorization": "Basic NmZiYWM5NDctZjc2ZS00Zjg4LWEwY2QtYzYwNzExYWYwODQz"
                };

                var options = {
                    host: "onesignal.com",
                    port: 443,
                    path: "/api/v1/notifications",
                    method: "POST",
                    headers: headers
                };

                var https = require('https');
                var req = https.request(options, function(res) {
                    res.on('data', function(data) {
                        console.log("Response:");
                        console.log(JSON.parse(data));
                        _res.json({result:true,data: JSON.parse(data)});
                    });
                });

                req.on('error', function(e) {
                    console.log("ERROR:");
                    console.log(e);
                    _res.json({result:true,err: e});
                });

                req.write(JSON.stringify(data));
                req.end();
            };

            var message = {
                app_id: "7ad2ec95-bbbc-4a28-aaf0-097ed2de2177",
                contents: {"en": "New Notice has Arrived! Check News Feed"},
                include_player_ids: target,
                data: {"type":"notice"}
            };

            sendNotification(message);
        });
    });
});
router.get("/notice",function(req,res,next){
    models.Notice.findAll({
        order: [['createdAt','desc']]
    }).then(function(notices){
        res.json(notices);
    })
});

module.exports = router;