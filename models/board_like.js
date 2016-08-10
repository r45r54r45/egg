"use strict";

module.exports = function (sequelize, DataTypes) {
    var Board_like = sequelize.define("Board_like", {
    },{
        classMethods:{
            associate:function(models){
               
                
            }
        }
    });
    return Board_like;
};