'use strict';

let _ = require('underscore');
let TodoNotFoundException = require('../../exceptions/TodoNotFoundException');

let nextId = 0;
let todos = [];

function TodoService() {};

TodoService.prototype.list = function(filters) {
    return new Promise(function(resolve, reject) {
        try {
            let filteredTodos = todos;

            if(filters.hasOwnProperty('completed')) {
                filteredTodos = _.where(todos, {completed : filters.completed === 'true'});
            }

            resolve(filteredTodos);
        } catch (e) {
            console.log(e);
            reject({
                status : e.status || 500,
                message : e.message
            });
        }
    });
};

TodoService.prototype.findById = function(id) {
    return new Promise(function(resolve, reject) {
        let todo = _.findWhere(todos, {id : parseInt(id, 10)}); 

        try {
            if(!todo) {
                throw new TodoNotFoundException(`Todo with id ${id} not found!`);
            }
            resolve(todo);
        } catch (e) {
            console.log(e.message);
            reject({
                status : e.status || 500,
                message : e.message
            });
        }
    });
};

TodoService.prototype.save = function(todoDTO) {
    return new Promise(function(resolve, reject) {
        try {
            let todo = {
                id : ++nextId,
                description : todoDTO.description,
                completed : todoDTO.completed
            };

            todos.push(todo);
            resolve(todo.id);
        } catch (e) {
            console.log(e);
            reject({
                status : e.status || 500,
                message : e.message
            });
        }
    });
};

TodoService.prototype.update = function(todoDTO) {
    return new Promise(function(resolve, reject) {
        _.extend(todo, {description : todoDTO.description, completed : todoDTO.completed});
        resolve();
    });
}

module.exports = function() {
    return TodoService;
};