"use strict";

module.exports = function (sequelize, DataTypes) {
    var Assess = sequelize.define("Assess", {
        professor_rate:DataTypes.INTEGER(1),
        difficulty:DataTypes.INTEGER(1),
        professor:DataTypes.INTEGER(1),
        attendance:DataTypes.BOOLEAN,
        grade:DataTypes.BOOLEAN,
        capacity:DataTypes.INTEGER(1),
        tags:DataTypes.STRING(1000),
        describe:DataTypes.TEXT,
        rating:DataTypes.INTEGER(1),
        heart:{
            type: DataTypes.INTEGER,
            defaultValue:0
        },
        comment:{
            type: DataTypes.INTEGER,
            defaultValue:0
        }
    },{
        classMethods:{
            associate:function(models){
                Assess.hasMany(models.Assess_comment);
                Assess.belongsTo(models.User);
            }
        }
    });
    return Assess;
};