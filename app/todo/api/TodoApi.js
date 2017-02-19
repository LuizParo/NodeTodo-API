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
        let filters = req.query;
        filters.userId = req.user.id;

        this._service.list(filters)
            .then(todos => res.json(todos))
            .catch(error => {
                let errorResponse = this._errorHandler.handle(error);
                res.status(errorResponse.status).json(errorResponse);
            });
    }

    findById(req, res) {
        let filters = {
            id : req.params.id,
            userId : req.user.id
        }

        this._service.findById(filters)
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
        let todoDTO = req.body;
        todoDTO.user = req.user;

        this._service.update(req.params.id, todoDTO)
            .then(() => res.sendStatus(204))
            .catch(error => {
                let errorResponse = this._errorHandler.handle(error);
                res.status(errorResponse.status).json(errorResponse);
            });
    }

    delete(req, res) {
        let filters = {
            id : req.params.id,
            userId : req.user.id
        }

        this._service.delete(filters)
            .then(() => res.sendStatus(204))
            .catch(error => {
                let errorResponse = this._errorHandler.handle(error);
                res.status(errorResponse.status).json(errorResponse);
            });
    }
}

module.exports = () => TodoApi;