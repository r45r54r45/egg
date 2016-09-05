var express = require('express');
var app = express();
var router = express.Router();
var models = require('../models');
var fs = require('fs');
var User = models.User;
var Point = models.Point;
var Board_type = models.Board_type;
var Like = models.Board_like;
var Comment = models.Board_comment;
var Board = models.Board;
var format = require('util').format;
var multer = require('multer')({
    inMemory: true,
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
});
var gcloud = require('gcloud');
var storage = gcloud.storage({
    projectId: 901522536554
});
var bucket = storage.bucket("image_yic");
router.get('/free_list', function (req, res, next) {
    //get board_type list and some boards
    var uid=req.query.user;
    Board.findAll({
        where: {
            BoardTypeId: 1
        },
        include: [{
            model: User,
            attributes: ['username']
        },{
            model: models.Board_like,
            where: {
                UserId: uid
            },
            required: false,
            attributes: ['id']
        }],
        attributes: ['id', 'title', 'body', 'createdAt', 'heart', 'comment','UserId'],
        limit: 10,
        order: [['createdAt', 'desc']]
    }).then(function (boards) {
        res.json(boards);
    });
});
router.get('/free_list/:from', function (req, res, next) {
    //get board_type list and some boards
    var uid=req.query.user;
    Board.findAll({
        where: {
            BoardTypeId: 1
        },
        include: [{
            model: User,
            attributes: ['username']
        },{
            model: models.Board_like,
            where: {
                UserId: uid
            },
            required: false,
            attributes: ['id']
        }],
        attributes: ['id', 'title', 'body', 'createdAt', 'heart', 'comment','UserId'],
        offset: req.params.from,
        limit: 10,
        order: [['createdAt', 'desc']]
    }).then(function (boards) {
        res.json(boards);
    });
});
router.get('/council_list', function (req, res, next) {
    //get board_type list and some boards
    var uid=req.query.user;
    Board.findAll({
        where: {
            BoardTypeId: 2
        },
        include: [{
            model: User,
            attributes: ['username']
        },{
            model: models.Board_like,
            where: {
                UserId: uid
            },
            required: false,
            attributes: ['id']
        }],
        attributes: ['id', 'title', 'body', 'createdAt', 'heart', 'comment','UserId'],
        limit: 10,
        order: [['createdAt', 'desc']]
    }).then(function (boards) {
        res.json(boards);
    });
});
router.get('/council_list/:from', function (req, res, next) {
    //get board_type list and some boards
    var uid=req.query.user;
    Board.findAll({
        where: {
            BoardTypeId: 2
        },
        include: [{
            model: User,
            attributes: ['username']
        },{
            model: models.Board_like,
            where: {
                UserId: uid
            },
            required: false,
            attributes: ['id']
        }],
        attributes: ['id', 'title', 'body', 'createdAt', 'heart', 'comment','UserId'],
        limit: 10,
        offset: req.params.from,
        order: [['createdAt', 'desc']]
    }).then(function (boards) {
        res.json(boards);
    });
});

router.get('/watch/:id', function (req, res, next) {
    var uid=req.query.user;
    Board.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'username']
            },{
                model: models.Board_like,
                where: {
                    UserId: uid
                },
                required: false,
                attributes: ['id']
            }
        ],
        attribute: ['id', 'title', 'image', 'body', 'createdAt', 'heart', 'comment','UserId']
    }).then(function (board) {
        res.json(board);
    }, function (err) {
        res.json(err);
    });
});


router.get('/comment/:boardId', function (req, res, next) {
    Comment.findAll({
        where: {
            BoardId: req.params.boardId
        },
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ],
        limit: 10,
        attribute: ['body', 'createdAt'],
        order: [['createdAt', 'desc']]
    }).then(function (board) {
        res.json(board);
    }, function (err) {
        res.json(err);
    });
});
router.get('/comment/:boardId/:more', function (req, res, next) {
    Comment.findAll({
        where: {
            BoardId: req.params.boardId
        },
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ],
        offset: req.params.more,
        limit: 10,
        attribute: ['body', 'createdAt'],
        order: [['createdAt', 'desc']]
    }).then(function (board) {
        res.json(board);
    }, function (err) {
        res.json(err);
    });
});
router.post('/comment', function (req, res, next) {
    var bid = req.body.board;
    var _res = res;
    Comment.create({
        body: req.body.body,
        BoardId: req.body.board,
        UserId: req.body.user
    }).then(function (comment) {
        Board.findOne({
            where: {
                id: req.body.board
            }
        }).then(function (board) {
            board.increment('comment', {by: 1}).then(function () {
                res.json(comment.dataValues);
            });
            if (board.dataValues.UserId == req.body.user) {

            } else {
                models.User.findOne({
                    where: {
                        id: board.dataValues.UserId
                    }
                }).then(function (user) {
                    var sendNotification = function (data) {
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
                        var req = https.request(options, function (res) {
                            res.on('data', function (data) {
                                console.log("Response:");
                                console.log(JSON.parse(data));
                                _res.json({result: true, data: JSON.parse(data)});
                            });
                        });

                        req.on('error', function (e) {
                            console.log("ERROR:");
                            console.log(e);
                            _res.json({result: true, err: e});
                        });

                        req.write(JSON.stringify(data));
                        req.end();
                    };

                    var message = {
                        app_id: "7ad2ec95-bbbc-4a28-aaf0-097ed2de2177",
                        contents: {"en": "Someone wrote comment on your board"},
                        include_player_ids: [user.dataValues.push_id],
                        data: {"type": "board", boardId: bid}
                    };

                    sendNotification(message);
                });
            }
            ;
        });
    })
});

router.post('/upload', multer.single('file'), function (req, res, next) {
    if (req.file) {
        console.log(req.file);
        var blob = bucket.file(new Date().getTime() + "." + req.file.mimetype.split("/")[1]);
        var blobStream = blob.createWriteStream();

        blobStream.on('error', function (err) {
            return next(err);
        });

        blobStream.on('finish', function () {
            var publicUrl = format(
                'https://storage.googleapis.com/%s/%s',
                bucket.name, blob.name);
            res.json({
                result: true,
                image: publicUrl
            });
        });
        blobStream.end(req.file.buffer);
    } else {
        res.json({result: false});
    }
});

router.post('/write', function (req, res, next) {
    console.log(req.body);
    Board.create({
        UserId: req.body.user,
        title: req.body.title,
        body: req.body.body,
        BoardTypeId: req.body.type,
        image: req.body.image
    }).then(function (created) {
        res.json({result: true});
    }, function () {
        res.json({result: false});
    });
});

router.post('/like', function (req, res, next) {
    Board.findOne({
        where: {
            id: req.body.board
        }
    }).then(function (board) {
        Like.count({
            where: {
                UserId: req.body.user,
                BoardId: req.body.board
            }
        }).then(function (num) {
            if (num == 0) {
                Like.create({
                    UserId: req.body.user,
                    BoardId: req.body.board
                });
                board.increment('heart', {by: 1}).then(function () {
                    res.json({result: true, like: true});
                });
            } else {
                Like.destroy({
                    where: {
                        UserId: req.body.user,
                        BoardId: req.body.board
                    }
                });
                board.increment('heart', {by: -1}).then(function () {
                    res.json({result: true, like: false});
                });
            }
        });
    });
});
module.exports = router;
