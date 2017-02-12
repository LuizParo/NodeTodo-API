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
            .catch(error => res.status(error.status).json(error));
    }

    findById(req, res) {
        this._service.findById(req.params.id)
            .then(todo => res.json(todo))
            .catch(error => res.status(error.status).json(error));
    }

    save(req, res) {
        let body = req.body;

        this._service.save(body)
            .then(todoId => {
                res.location(`${req.get('host')}/todos/${todoId}`);
                res.sendStatus(201);
            })
            .catch(error => res.status(error.status).json(error));
    }

    update(req, res) {
        this._service.update(req.params.id, req.body)
            .then(() => res.sendStatus(204))
            .catch(error=> res.status(error.status).json(error));
    }

    delete(req, res) {
        this._service.delete(req.params.id)
            .then(() => res.sendStatus(204))
            .catch(error => res.status(error.status).json(error));
    }
}

module.exports = () => TodoApi;