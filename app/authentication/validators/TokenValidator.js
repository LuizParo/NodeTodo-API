'use strict';

let TokenNotFoundException = require('../exceptions/TokenNotFoundException');

class TokenValidator {

    validateIfTokenWasFound(token) {
        if(token == null) {
            throw new TokenNotFoundException(`Invalid token sent on the request!`);
        }

        return token;
    }
}

module.exports = () => TokenValidator;