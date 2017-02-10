'use strict';

let ExtendableError = require('../../exceptions/ExtendableError');

class InvalidTodoException extends ExtendableError {

    constructor(message) {
        super(message, 400);
    }
}

module.exports = InvalidTodoException;