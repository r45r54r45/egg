"use strict";

module.exports = function (sequelize, DataTypes) {
    var Board = sequelize.define("Board", {
        title:DataTypes.STRING,
        body:DataTypes.STRING,
        heart:{
            type:DataTypes.INTEGER,
            defaultValue:0
        },
        comment:{
            type:DataTypes.INTEGER,
            defaultValue:0
        },
        image:{
            type:DataTypes.STRING,
            defaultValue:null
        }
    },{
        classMethods:{
            associate:function(models){
                Board.hasMany(models.Board_like);
                Board.hasMany(models.Board_comment);
            }

        }
    });
    return Board;
};