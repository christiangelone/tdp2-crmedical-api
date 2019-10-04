'use strict';
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

module.exports.models = {};

exports.initEntitiyModels = async db => {
    fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const model = db['import'](path.join(__dirname, file));
      module.exports.models[model.name] = model;
    });
  
  Object.keys(module.exports.models).forEach(modelName => {
    if (module.exports.models[modelName].associate) {
      module.exports.models[modelName].associate(module.exports.models);
    }
  });

  return module.exports.models;
}