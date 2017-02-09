'use strict';

let _ = require('underscore');

let TodoApi = function(service) {
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
            res.status(error.status).json(error.message);
        });
};

TodoApi.prototype.findById = function(req, res) {
    this._service.findById(req.params.id)
        .then(function(todo) {
            res.json(todo);
        })
        .catch(function(error) {
            res.status(error.status).json(error.message);
        });
};

TodoApi.prototype.save = function(req, res) {
    let body = req.body;

    if(!_.isBoolean(body.completed) || !_.isString(body.description || !body.description.length)) {
        res.sendStatus(400);
        return;
    }

    this._service.save(body)
        .then(function(todoId) {
            res.location(`${req.get('host')}/todos/${todoId}`);
            res.sendStatus(201);
        })
        .catch(function(error) {
            res.status(error.status).json(error.message);
        });

};

TodoApi.prototype.update = function(req, res) {
    let todo = _.findWhere(todos, {id : parseInt(req.params.id, 10)});
    if(!todo) {
        res.sendStatus(404);
        return;
    }

    let body = req.body;
    if(!body.hasOwnProperty('completed') || !_.isBoolean(body.completed)) {
        res.status(400).json({
            error : 'completed field is absent or invalid'
        });
        return;
    }

    if(!body.hasOwnProperty('description') || !_.isString('description')) {
        res.status(400).json({
            error : 'description field is absent or invalid'
        });
        return;
    }

    this._service.update(body)
        .then(function() {
            res.sendStatus(204);
        })
        .catch(function(error) {
            res.status(error.status).json(error.message);
        });
};

TodoApi.prototype.delete = function(req, res) {
    let todo = _.findWhere(todos, {id : parseInt(req.params.id, 10)});

    if(!todo) {
        res.sendStatus(404);
        return;
    }

    todos = _.without(todos, todo);
    res.sendStatus(204);
};

module.exports = function() {
    return TodoApi;
};