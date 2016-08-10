"use strict";

module.exports = function (sequelize, DataTypes) {
    var Notice = sequelize.define("Notice", {
        title:DataTypes.STRING,
        image:DataTypes.STRING,
        body:DataTypes.TEXT
    },{
        classMethods:{
            associate:function(models){
                // Notice.belongsTo(models.Admin);
            }
        }
    });
    return Notice;
};