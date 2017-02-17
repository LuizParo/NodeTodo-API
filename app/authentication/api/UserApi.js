'use strict';

class UserApi {

    constructor(service, errorHandler) {
        this._service = service;
        this._errorHandler = errorHandler;
    }

    save(req, res) {
        return this._service.save(req.body)
            .then(userId => {
                res.location(`${req.get('host')}/users/${userId}`);
                res.sendStatus(201);
            })
            .catch(error => {
                let errorResponse = this._errorHandler.handle(error);
                res.status(errorResponse.status).json(errorResponse);
            });
    }

    login(req, res) {
        return this._service.login(req.body)
            .then(data => res.header('auth', data.token).json(data.user.toPublicJSON()))
            .catch(error => {
                let errorResponse = this._errorHandler.handle(error);
                res.status(errorResponse.status).json(errorResponse);
            });
    }
}

module.exports = () => UserApi;