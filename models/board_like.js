"use strict";

module.exports = function (sequelize, DataTypes) {
    var Board_like = sequelize.define("Board_like", {
    },{
        classMethods:{
            associate:function(models){
               Board_like.belongsTo(models.Board);
                Board_like.belongsTo(models.User);
            }
        }
    });
    return Board_like;
};