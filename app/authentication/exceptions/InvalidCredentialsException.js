'use strict';

let ExtendableError = require('../../exceptions/ExtendableError');

class InvalidCredentialsException extends ExtendableError {

    constructor(message) {
        super(message, 401);
    }
}

module.exports = InvalidCredentialsException;