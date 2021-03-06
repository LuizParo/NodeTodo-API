'use strict';

module.exports = app => {
    let factory = new app.authentication.factories.UserServiceFactory(app);

    let service = factory.create();
    let errorHandler = new app.utils.ErrorHandler();

    let authenticationMiddleware = new app.authentication.api.AuthenticationMiddleware(service, errorHandler);
    
    let api = new app.authentication.api.UserApi(service, errorHandler);

    app.post('/users', (req, res) => api.save(req, res));

    app.post('/users/login', (req, res) => api.login(req, res));

    app.delete('/users/login',
               (req, res, next) => authenticationMiddleware.requireAuthentication(req, res, next),
               (req, res) => api.logout(req, res));
};