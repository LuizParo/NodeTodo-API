'use strict';

let Sequelize = require('sequelize');
let database = require('../../../config/database');
let bcrypt = require('bcrypt');
let _ = require('underscore');

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

        salt : {
            type : Sequelize.STRING
        },

        password_hash : {
            type : Sequelize.STRING
        },

        password : {
            type : Sequelize.VIRTUAL,
            allowNull : false,
            validate : {
                len : [7, 100]
            },
            set : function(value) {
                let salt = bcrypt.genSaltSync(10);
                let hashedPassword = bcrypt.hashSync(value, salt);

                this.setDataValue('password', value);
                this.setDataValue('salt', salt);
                this.setDataValue('password_hash', hashedPassword);
            }
        }
    }, {
        hooks : {
            beforeValidate : (user, options) => {
                if(typeof user.email === 'string') {
                    user.email = user.email.toLowerCase();
                }
            }
        },

        instanceMethods : {
            toPublicJSON : () => {
                let json = this.toJSON();
                return _.pick(this, 'id', 'email', 'createdAt', 'updatedAt');
            }
        }
    });

    return User;
};