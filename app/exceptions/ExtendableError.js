'use strict';

class ExtendableError extends Error {

    constructor(message, status) {
        super();

        this.name = super.constructor.name;

        this._message = message;
        this._status = status;
    }

    get message() {
        return this._message;
    }

    get status() {
        return this._status;
    }
}

module.exports = ExtendableError;