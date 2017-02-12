'use strict';

class TodoService {

    constructor(validator, repository) {
        this._validator = validator;
        this._repository = repository;
    }

    list(filters) {
        return this._repository.findAll(filters);
    }

    findById(id) {
        return this._repository.findById(id)
            .then(todo => this._validator.assertIfExists(todo, id));
    }

    save(todoDTO) {
        let todo = {
            description : todoDTO.description,
            completed : todoDTO.completed
        };

        return this._repository.save(todo)
            .then(todo => todo.id);
    }

    update(id, todoDTO) {
        let updatedTodo = {};

        if(todoDTO.hasOwnProperty('description')) {
            updatedTodo.description = todoDTO.description;
        }

        if(todoDTO.hasOwnProperty('completed')) {
            updatedTodo.completed = todoDTO.completed;
        }

        return this._repository.findById(id)
            .then(todo => this._validator.assertIfExists(todo, id))
            .then(todo => todo.update(updatedTodo));
    }

    delete(id) {
        return this._repository.deleteById(id)
            .then(rowsDeleted => this._validator.assertRowsNotEmpty(rowsDeleted, id));
    }
}

module.exports = () => TodoService;