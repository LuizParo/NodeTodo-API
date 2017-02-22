'use strict';

let cryptojs = require('crypto-js');

class TokenRepository {

    constructor(token) {
        this._token = token;
    }

    save(token) {
        return this._token.create({token : token});
    }

    findByToken(token) {
        return this._token.findOne({
            where : {
                tokenHash : cryptojs.MD5(token).toString()
            }
        });
    }

    remove(token) {
        return this._token.destroy({
            where : {
                tokenHash : token.tokenHash
            }
        });
    }
}

module.exports = () => TokenRepository;