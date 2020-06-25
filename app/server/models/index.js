"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");

var sequelize = new Sequelize('postgres://todoapp:teste@db/todos');

var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


//Relations
//db.sequelize.models.User.hasMany(db.sequelize.models.Job);
//Relationship for Job and JobDescription
//db.sequelize.models.Job.hasMany(db.sequelize.models.JobDescription, {onDelete : 'cascade'}, {onUpdate : 'cascade'});
//db.sequelize.models.JobDescription.belongsTo(db.sequelize.models.Job);

module.exports = db;
