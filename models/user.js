"use strict";

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: DataTypes.STRING,
        school_num: DataTypes.STRING

    }, {
        classMethods: {
            associate: function (models) {
                User.hasMany(models.Point);
                User.hasMany(models.Assess);
                User.hasMany(models.Assess_comment);
                User.hasMany(models.Board_like);
                User.hasMany(models.Board);
                User.hasMany(models.Board_comment);
                User.hasMany(models.Buy);
            }
        }
    });

    return User;
};