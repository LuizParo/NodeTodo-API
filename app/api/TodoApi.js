'use strict';

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
    let filteredTodo = todos.filter(todo => todo.id === parseInt(req.params.id));
    let todo = filteredTodo[0];

    if(!todo) {
        res.status(404).send();
        return;
    }
    res.json(todo);
};

TodoApi.prototype.save = function(req, res) {
    let body = req.body;

    todos.push({
        id : ++nextTodoId,
        description : body.description,
        completed : body.completed
    });

    res.sendStatus(201);
};

module.exports = function() {
    return TodoApi;
};