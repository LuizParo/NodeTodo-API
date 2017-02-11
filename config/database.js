'use strict';

let Sequelize = require('sequelize');

let sequelize = new Sequelize(undefined, undefined, undefined, {
    dialect : 'sqlite',
    storage : `${__dirname}/dev-todo-api.sqlite`
});

module.exports = sequelize;