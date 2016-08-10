"use strict";

module.exports = function (sequelize, DataTypes) {
    var Assess_comment = sequelize.define("Assess_comment", {
        comment:DataTypes.TEXT
    },{
        classMethods:{
            associate:function(models){
                
            }
        }
    });
    return Assess_comment;
};