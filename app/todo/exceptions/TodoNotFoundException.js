'use strict';

let ExtendableError = require('../../exceptions/ExtendableError');

class TodoNotFoundException extends ExtendableError {

    constructor(message) {
        super(message, 404);
    }
}

module.exports = TodoNotFoundException;