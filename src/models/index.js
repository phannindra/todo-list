'use strict';

const fs = require('fs');
const path = require('path');
const SequelizeLib = require('sequelize');
const basename = path.basename(__filename);
const dbModels = {};
const sequelizeInstance = require('./../config/db.js')

const files = fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && // excluding the file if it starts with '.'
      file !== basename && // excluding the current file
      file.slice(-3) === '.js' && //checking if the file is js or not
      file.indexOf('.test.js') === -1 //excluding test files
    );
  })

files
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelizeInstance, SequelizeLib.DataTypes);
    dbModels[model.name] = model;
  });

//checking if the model has any associations with other models
Object.keys(dbModels).forEach(modelName => {
  if (dbModels[modelName].associate) {
    dbModels[modelName].associate(dbModels);
  }
});

dbModels.sequelize = sequelizeInstance;
dbModels.Sequelize = SequelizeLib;

module.exports = dbModels;
