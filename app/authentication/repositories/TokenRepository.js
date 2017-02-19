'use strict';

class TokenRepository {

    constructor(token) {
        this._token = token;
    }

    save(token) {
        return this._token.create({token : token});
    }
}

module.exports = () => TokenRepository;