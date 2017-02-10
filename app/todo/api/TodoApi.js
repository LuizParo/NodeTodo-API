'use strict';

let _ = require('underscore');

function TodoApi(service) {
    this._service = service;
};

TodoApi.prototype.info = function(req, res) {
    res.send('Todo API Root');
};

TodoApi.prototype.list = function(req, res) {
    this._service.list(req.query)
        .then(function(todos) {
            res.json(todos);
        })
        .catch(function(error) {
            res.status(error.status).json(error);
        });
};

TodoApi.prototype.findById = function(req, res) {
    this._service.findById(req.params.id)
        .then(function(todo) {
            res.json(todo);
        })
        .catch(function(error) {
            res.status(error.status).json(error);
        });
};

TodoApi.prototype.save = function(req, res) {
    let body = req.body;

    this._service.save(body)
        .then(function(todoId) {
            res.location(`${req.get('host')}/todos/${todoId}`);
            res.sendStatus(201);
        })
        .catch(function(error) {
            res.status(error.status).json(error);
        });

};

TodoApi.prototype.update = function(req, res) {
    this._service.update(req.params.id, req.body)
        .then(function() {
            res.sendStatus(204);
        })
        .catch(function(error) {
            res.status(error.status).json(error);
        });
};

TodoApi.prototype.delete = function(req, res) {
    this._service.delete(req.params.id)
        .then(function() {
            res.sendStatus(204);
        })
        .catch(function(error) {
            res.status(error.status).json(error);
        });
};

module.exports = function() {
    return TodoApi;
};