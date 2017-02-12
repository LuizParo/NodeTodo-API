'use strict';

let Sequelize = require('sequelize');
const ENV = process.env.NODE_ENV || 'development';

let sequelize = ENV === 'development'
    ? new Sequelize(undefined, undefined, undefined, {
        dialect : 'sqlite',
        storage : `${__dirname}/dev-todo-api.sqlite`
    })
    : new Sequelize(process.env.DATABASE_URL, {
        dialect : 'postgres'
    });

module.exports = sequelize;