'use strict';

let ExtendableError = require('../../exceptions/ExtendableError');

class TokenNotFoundException extends ExtendableError {

    constructor(message) {
        super(message, 401);
    }
}

module.exports = TokenNotFoundException;