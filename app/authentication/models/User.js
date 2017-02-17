'use strict';

let Sequelize = require('sequelize');
let bcrypt = require('bcrypt');
let _ = require('underscore');
let cryptojs = require('crypto-js');
let jwt = require('jsonwebtoken');

let database = require('../../../config/database');
let InvalidCredentialsException = require('../exceptions/InvalidCredentialsException');

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
            toPublicJSON : function() {
                let json = this.toJSON();
                return _.pick(this, 'id', 'email', 'createdAt', 'updatedAt');
            },

            checkIfPasswordMatches : function(password) {
                if(!bcrypt.compareSync(password, this.get('password_hash'))) {
                    throw new InvalidCredentialsException('Invalid password');
                }

                return this;
            },

            generateToken : function(type) {
                if(!_.isString(type)) {
                    throw new Error('The type of the token to be generated must be a string!');
                }

                let stringData = JSON.stringify({
                    id : this.get('id'),
                    type : type
                });

                let encryptedData = cryptojs.AES.encrypt(stringData, 'abc123!@#!').toString();
                let token = jwt.sign({token : encryptedData}, 'qwerty098');

                return token;
            }
        }
    });

    return User;
};