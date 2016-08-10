"use strict";

module.exports = function (sequelize, DataTypes) {
    var Class = sequelize.define("Class", {
        category: {
            type: DataTypes.STRING(10)
        },
        year: DataTypes.STRING(20),
        professor: DataTypes.STRING(200),
        title:DataTypes.STRING(500)
    },{
        classMethods:{
            associate:function(models){
                Class.hasMany(models.Assess);
                Class.hasMany(models.Buy);
            }
        }
    });
    return Class;
};