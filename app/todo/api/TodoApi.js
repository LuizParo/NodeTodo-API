'use strict';

class TodoApi {

    constructor(service) {
        this._service = service;
    }

    info(req, res) {
        res.send('Todo API Root');
    }

    list(req, res) {
        this._service.list(req.query)
            .then(todos => res.json(todos))
            .catch(error => this._handleError(res, error));
    }

    findById(req, res) {
        this._service.findById(req.params.id)
            .then(todo => res.json(todo))
            .catch(error => this._handleError(res, error));
    }

    save(req, res) {
        let body = req.body;

        this._service.save(body)
            .then(todoId => {
                res.location(`${req.get('host')}/todos/${todoId}`);
                res.sendStatus(201);
            })
            .catch(error => this._handleError(res, error));
    }

    update(req, res) {
        this._service.update(req.params.id, req.body)
            .then(() => res.sendStatus(204))
            .catch(error=> this._handleError(res, error));
    }

    delete(req, res) {
        this._service.delete(req.params.id)
            .then(() => res.sendStatus(204))
            .catch(error => this._handleError(res, error));
    }

    _handleError(res, error) {
        console.log(error);

        let obj = {
            status : error.status || 500,
            message : error.message
        };

        res.status(obj.status).json(obj);
    }
}

module.exports = () => TodoApi;