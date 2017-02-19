'use strict';

let Sequelize = require('sequelize');
let database = require('../../../config/database');

module.exports = (app) => {
    let Todo = database.define('todo', {
        description : {
            type : Sequelize.STRING,
            allowNull : false,
            validate : {
                len : [1, 250]
            }
        },

        completed : {
            type : Sequelize.BOOLEAN,
            allowNull : false,
            defaultValue : false
        }
    });

    let User = app.authentication.models.User;

    Todo.belongsTo(User);
    User.hasMany(Todo);

    return Todo;
};