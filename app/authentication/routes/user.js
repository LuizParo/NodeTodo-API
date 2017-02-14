'use strict';

module.exports = app => {
    let user = app.authentication.models.User;
    let repository = new app.authentication.repositories.UserRepository(user);
    let service = new app.authentication.services.UserService(repository);
    let api = new app.authentication.api.UserApi(service);

    app.post('/users', (req, res) => api.save(req, res));
};