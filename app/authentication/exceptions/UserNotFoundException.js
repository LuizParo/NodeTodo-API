'use strict';

let ExtendableError = require('../../exceptions/ExtendableError');

class UserNotFoundException extends ExtendableError {

    constructor(message) {
        super(message, 401);
    }
}

module.exports = UserNotFoundException;