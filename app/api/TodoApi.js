'use strict';

let _ = require('underscore');

let todos = [];
let nextTodoId = 0;

let TodoApi = function() {};

TodoApi.prototype.info = function(req, res) {
    res.send('Todo API Root');
};
    
TodoApi.prototype.listAll = function(req, res) {
    res.json(todos);
};

TodoApi.prototype.findById = function(req, res) {
    let todo = _.findWhere(todos, {id : parseInt(req.params.id, 10)});

    if(!todo) {
        res.sendStatus(404);
        return;
    }
    res.json(todo);
};

TodoApi.prototype.save = function(req, res) {
    let body = req.body;

    if(!_.isBoolean(body.completed) || !_.isString(body.description || !body.description.length)) {
        res.sendStatus(400);
        return;
    }

    todos.push({
        id : ++nextTodoId,
        description : body.description,
        completed : body.completed
    });

    res.sendStatus(201);
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