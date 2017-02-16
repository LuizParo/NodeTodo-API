'use strict';

module.exports = app => {
    let errorHandler = new app.utils.ErrorHandler();

    let user = app.authentication.models.User;
    let validator = new app.authentication.validators.UserValidator();
    let repository = new app.authentication.repositories.UserRepository(user);
    let service = new app.authentication.services.UserService(repository, validator);
    let api = new app.authentication.api.UserApi(service, errorHandler);

    app.post('/users', (req, res) => api.save(req, res));

    app.post('/users/login', (req, res) => api.login(req, res));
};