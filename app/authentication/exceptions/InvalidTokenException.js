'use strict';

let ExtendableError = require('../../exceptions/ExtendableError');

class InvalidTokenException extends ExtendableError {

    constructor(message) {
        super(message, 401);
    }
}

module.exports = InvalidTokenException;