'use strict';

let _ = require('underscore');
let TodoNotFoundException = require('../exceptions/TodoNotFoundException');
let InvalidTodoException = require('../exceptions/InvalidTodoException');

let todos = [];

class TodoService {

    constructor(validator, repository) {
        this._validator = validator;
        this._repository = repository;
    }

    list(filters) {
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
    }

    findById(id) {
        return this._repository.findById(id)
            .then(todo => this._validator.assertIfExists(todo, id))
            .catch(error => this._handleError(error));
    }

    save(todoDTO) {
        let todo = {
            description : todoDTO.description,
            completed : todoDTO.completed
        };

        return this._repository.save(todo)
            .catch(error => this._handleError(error));
    }

    update(id, todoDTO) {
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
    }

    delete(id) {
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
    }

    _handleError(error) {
        console.log(error);

        return {
            status : error.status || 500,
            message : error.message
        };
    }
}

module.exports = () => TodoService;