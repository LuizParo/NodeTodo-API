'use strict';

class BusinessException extends Error {

    constructor(message) {
        super(message);
    }
}

module.exports = function() {
    return BusinessException;
};