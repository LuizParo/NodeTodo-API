'use strict';

let Sequelize = require('sequelize');
let database = require('../../../config/database');

module.exports = () => {
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

    let User = database.define('user', {
        email : Sequelize.STRING
    });

    Todo.belongsTo(User);
    User.hasMany(Todo);

    return Todo;
};