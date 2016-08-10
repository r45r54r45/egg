"use strict";

module.exports = function (sequelize, DataTypes) {
    var Board_comment = sequelize.define("Board_comment", {
        body: DataTypes.STRING,
    },{
        classMethods:{
            associate:function(models){
                

            }
        }
    });
    return Board_comment;
};