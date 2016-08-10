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
    models.Notice.create({
        title: req.body.title,
        image: req.body.image,
        body: req.body.body,
        target: req.body.target
    }).then(function(result){
        res.json({result:true});
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