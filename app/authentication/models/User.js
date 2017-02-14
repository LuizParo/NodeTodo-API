'use strict';

let Sequelize = require('sequelize');
let database = require('../../../config/database');

module.exports = () => {
    let User = database.define('User', {
        email : {
            type : Sequelize.STRING,
            allowNull : false,
            unique : true,
            validate : {
                isEmail : true
            }
        },

        password : {
            type : Sequelize.STRING,
            allowNull : false,
            validate : {
                len : [7, 100]
            }
        }
    }, {
        hooks : {
            beforeValidate : (user, options) => {
                if(typeof user.email === 'string') {
                    user.email = user.email.toLowerCase();
                }
            }
        }
    });

    return User;
};