'use strict';

class ExtendableError extends Error {

    constructor(message) {
        super();

        this.name = super.constructor.name;

        this._message = message;
        this._status = 404;
    }

    get message() {
        return this._message;
    }

    get status() {
        return this._status;
    }
}

module.exports = ExtendableError;