"use strict";

module.exports = function (sequelize, DataTypes) {
    var Point = sequelize.define("Point", {
        amount: DataTypes.INTEGER
    }, {
        paranoid:true,
        classMethods: {
            associate: function(models) {
                Point.belongsTo(models.User);
            },
            getTotalPoints:function(UserId,callback){
                sequelize.models.Point.find({
                    attributes: [[sequelize.fn('SUM', sequelize.col('amount')), 'total']],
                    where: {
                        UserId:UserId
                    }
                }).then(function(data){
                    callback(data.dataValues.total);
                },function(data){
                    console.log(data);
                });
            }
        },
        instanceMethods:{

        }
    });
    return Point;
};