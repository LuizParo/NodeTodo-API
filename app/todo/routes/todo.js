'use strict';

module.exports = app => {
    let errorHandler = new app.utils.ErrorHandler();
    let todoServiceFactory = new app.todo.factories.TodoServiceFactory(app);
    let todoService = todoServiceFactory.create(app);
    let api = new app.todo.api.TodoApi(todoService, errorHandler);

    let userServiceFactory = new app.authentication.factories.UserServiceFactory(app);
    let userService = userServiceFactory.create();
    let authenticationMiddleware = new app.authentication.api.AuthenticationMiddleware(userService, errorHandler);

    app.get('/', api.info);

    app.get('/todos',
            (req, res, next) => authenticationMiddleware.requireAuthentication(req, res, next),
            (req, res) => api.list(req, res));

    app.get('/todos/:id', 
            (req, res, next) => authenticationMiddleware.requireAuthentication(req, res, next),
            (req, res) => api.findById(req, res));

    app.post('/todos',
            (req, res, next) => authenticationMiddleware.requireAuthentication(req, res, next),
            (req, res) => api.save(req, res));

    app.put('/todos/:id',
            (req, res, next) => authenticationMiddleware.requireAuthentication(req, res, next),
            (req, res) => api.update(req, res));

    app.delete('/todos/:id',
            (req, res, next) => authenticationMiddleware.requireAuthentication(req, res, next),
            (req, res) => api.delete(req, res));
};