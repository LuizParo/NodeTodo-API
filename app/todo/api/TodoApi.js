'use strict';

class TodoApi {

    constructor(service, errorHandler) {
        this._service = service;
        this._errorHandler = errorHandler;
    }

    info(req, res) {
        res.send('Todo API Root');
    }

    list(req, res) {
        this._service.list(req.query)
            .then(todos => res.json(todos))
            .catch(error => {
                let errorResponse = this._errorHandler.handle(error);
                res.status(errorResponse.status).json(errorResponse);
            });
    }

    findById(req, res) {
        this._service.findById(req.params.id)
            .then(todo => res.json(todo))
            .catch(error => {
                let errorResponse = this._errorHandler.handle(error);
                res.status(errorResponse.status).json(errorResponse);
            });
    }

    save(req, res) {
        let todoDTO = req.body;
        todoDTO.user = req.user;

        this._service.save(todoDTO)
            .then(todoId => {
                res.location(`${req.get('host')}/todos/${todoId}`);
                res.sendStatus(201);
            })
            .catch(error => {
                let errorResponse = this._errorHandler.handle(error);
                res.status(errorResponse.status).json(errorResponse);
            });
    }

    update(req, res) {
        this._service.update(req.params.id, req.body)
            .then(() => res.sendStatus(204))
            .catch(error => {
                let errorResponse = this._errorHandler.handle(error);
                res.status(errorResponse.status).json(errorResponse);
            });
    }

    delete(req, res) {
        this._service.delete(req.params.id)
            .then(() => res.sendStatus(204))
            .catch(error => {
                let errorResponse = this._errorHandler.handle(error);
                res.status(errorResponse.status).json(errorResponse);
            });
    }
}

module.exports = () => TodoApi;