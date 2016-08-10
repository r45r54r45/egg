var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;
var Point = models.Point;
/* GET home page. */
router.get('/points/:id', function (req, res, next) {
    models.Point.getTotalPoints(req.params.id, function (point) {
        res.json({point: point});
    });
});

module.exports = router;
