"use strict";

module.exports = function (sequelize, DataTypes) {
    var Board_comment = sequelize.define("Board_comment", {
        body: DataTypes.STRING,
    },{
        classMethods:{
            associate:function(models){
                Board_comment.belongsTo(models.Board);
                Board_comment.belongsTo(models.User);
            }
        }
    });
    return Board_comment;
};