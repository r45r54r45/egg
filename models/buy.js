"use strict";

module.exports = function (sequelize, DataTypes) {
    var Buy = sequelize.define("Buy", {
        
    },{
        classMethods:{
            associate:function(models){
                Buy.belongsTo(models.Class);
                Buy.belongsTo(models.User);
                
            }
        }
    });
    return Buy;
};