"use strict";

module.exports = function (sequelize, DataTypes) {
    var Assess_comment = sequelize.define("Assess_comment", {
        comment:DataTypes.TEXT
    },{
        classMethods:{
            associate:function(models){
                Assess_comment.belongsTo(models.Assess);
                Assess_comment.belongsTo(models.User);
            }
        }
    });
    return Assess_comment;
};