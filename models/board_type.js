"use strict";

module.exports = function (sequelize, DataTypes) {
    var Board_type = sequelize.define("Board_type", {
        title: DataTypes.STRING,
        auth: DataTypes.STRING
    },{
        classMethods:{
            associate:function(models){
                Board_type.hasMany(models.Board);
            }
        }
    });
    return Board_type;
};