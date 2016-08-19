"use strict";

module.exports = function (sequelize, DataTypes) {
    var Tag = sequelize.define("Tag", {
        name:DataTypes.STRING
    });
    return Tag;
};

// CREATE TABLE `Tags` (
//     `id` int(11) NOT NULL AUTO_INCREMENT,
//     `name` varchar(255) DEFAULT NULL,
//     `createdAt` datetime ,
//     `updatedAt` datetime ,
//     PRIMARY KEY (`id`)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
//
// INSERT into Tags (name) VALUES ('Tough Grader');
// INSERT into Tags (name) VALUES ('Gives Good Feedback');
// INSERT into Tags (name) VALUES ('Cares About Students');
// INSERT into Tags (name) VALUES ('Get Ready to Read');
// INSERT into Tags (name) VALUES ('Participation Matters');
// INSERT into Tags (name) VALUES ('Lots of Homework');
// INSERT into Tags (name) VALUES ('Skip Class? You Won’t Pass');
// INSERT into Tags (name) VALUES ('Inspirational');
// INSERT into Tags (name) VALUES ('Beware of Pop Quizzes');
// INSERT into Tags (name) VALUES ('So Many Papers');
// INSERT into Tags (name) VALUES ('Hilarious');
// INSERT into Tags (name) VALUES ('Respected By Students');
// INSERT into Tags (name) VALUES ('Accessible Outside Class');
// INSERT into Tags (name) VALUES ('Test Heavy');
// INSERT into Tags (name) VALUES ('Clear Grading Criteria');
// INSERT into Tags (name) VALUES ('Lecture Heavy');
// INSERT into Tags (name) VALUES ('Group Projects');
// INSERT into Tags (name) VALUES ('Graded By Few Things');
// INSERT into Tags (name) VALUES ('Amazing Lectures');
// INSERT into Tags (name) VALUES ('Extra Credit Offered');
// INSERT into Tags (name) VALUES ('High English Skills');
// INSERT into Tags (name) VALUES ('Low English Skills');