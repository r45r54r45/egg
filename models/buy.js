"use strict";

module.exports = function (sequelize, DataTypes) {
    var Buy = sequelize.define("Buy", {
        
    },{
        classMethods:{
            associate:function(models){

                
            }
        }
    });
    return Buy;
};