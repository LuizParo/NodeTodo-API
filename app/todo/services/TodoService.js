'use strict';

let _ = require('underscore');
let TodoNotFoundException = require('../exceptions/TodoNotFoundException');
let InvalidTodoException = require('../exceptions/InvalidTodoException');

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

            if(filters.hasOwnProperty('q') && filters.q.length) {
                filteredTodos = _.filter(filteredTodos, (todo) => todo.description
                    .toLowerCase()
                    .indexOf(filters.q.toLowerCase()) > -1);
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

TodoService.prototype.update = function(id, todoDTO) {
    return new Promise(function(resolve, reject) {
        try {
            let todo = _.findWhere(todos, {id : parseInt(id, 10)});

            if(!todo) {
                throw new TodoNotFoundException(`Todo with id ${id} not found!`);
            }

            if(!_.isBoolean(todoDTO.completed) || !_.isString(todoDTO.description) || !todoDTO.description.length) {
                throw new InvalidTodoException(`Todo must have a valid 'description' and 'completed' status!`);
            }

            _.extend(todo, {description : todoDTO.description, completed : todoDTO.completed});
            resolve();
        } catch (e) {
            console.log(e);
            reject({
                status : e.status || 500,
                message : e.message
            });
        }
    });
};

TodoService.prototype.delete = function(id) {
    return new Promise(function(resolve, reject){
        try {
            let todo = _.findWhere(todos, {id : parseInt(id, 10)});

            if(!todo) {
                throw new TodoNotFoundException(`Todo with id ${id} not found!`);
            }

            todos = _.without(todos, todo);
            resolve();
        } catch (e) {
            console.log(e);
            reject({
                status : e.status || 500,
                message : e.message
            });
        }
    });
};

module.exports = function() {
    return TodoService;
};