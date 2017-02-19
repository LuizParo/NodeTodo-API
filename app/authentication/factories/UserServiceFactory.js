'use strict';

class UserServiceFactory {

    constructor(app) {
        this._app = app;
    }

    create() {
        let user = this._app.authentication.models.User;
        let token = this._app.authentication.models.Token;

        let validator = new this._app.authentication.validators.UserValidator();
        let userRepository = new this._app.authentication.repositories.UserRepository(user);
        let tokenRepository = new this._app.authentication.repositories.TokenRepository(token);

        return new this._app.authentication.services.UserService(userRepository, tokenRepository, validator);
    }
}

module.exports = app => {
    return UserServiceFactory;
};