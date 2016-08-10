"use strict";

module.exports = function (sequelize, DataTypes) {
    var Notice = sequelize.define("Notice", {
        title:DataTypes.STRING(100),
        image:DataTypes.STRING(500),
        body:DataTypes.TEXT,
        target:DataTypes.STRING(1000)
    },{
        classMethods:{
            associate:function(models){
                // Notice.belongsTo(models.Admin);
            }
        }
    });
    return Notice;
};