'use strict';

let Sequelize = require('sequelize');
let sequelize = require('../../../config/database');

module.exports = app => {
    let Todo = sequelize.define('todo', {
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

    return Todo;
};