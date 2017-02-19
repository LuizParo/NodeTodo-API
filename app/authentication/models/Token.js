'use strict';

let cryptojs = require('crypto-js');
let Sequelize = require('sequelize');
let database = require('../../../config/database');

module.exports = app => {
    let Token = database.define('token', {
        token : {
            type : Sequelize.VIRTUAL,
            allowNull : false,
            validate : {
                len : [1]
            },
            set : function(value) {
                let hash = cryptojs.MD5(value).toString();

                this.setDataValue('token', value);
                this.setDataValue('tokenHash', hash);
            }
        },

        tokenHash : Sequelize.STRING
    });

    return Token;
};