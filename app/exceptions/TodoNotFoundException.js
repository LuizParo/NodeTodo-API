'use strict';

let BusinessException = require('./BusinessException');

class TodoNotFoundException extends BusinessException {

    constructor(message) {
        super(message);
        this._status = 404;
    }

    get status() {
        return this._status;
    }
}

module.exports = function() {
    return TodoNotFoundException;
};