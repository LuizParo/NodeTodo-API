'use strict';

class UserServiceFactory {

    constructor(app) {
        this._app = app;
    }

    create() {
        let user = this._app.authentication.models.User;
        let validator = new this._app.authentication.validators.UserValidator();
        let repository = new this._app.authentication.repositories.UserRepository(user);

        return new this._app.authentication.services.UserService(repository, validator);
    }
}

module.exports = app => {
    return UserServiceFactory;
};