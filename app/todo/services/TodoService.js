'use strict';

class TodoService {

    constructor(validator, repository) {
        this._validator = validator;
        this._repository = repository;
    }

    list(filters) {
        return this._repository.findAll(filters);
    }

    findById(filters) {
        return this._repository.findById(filters)
            .then(todo => this._validator.assertIfExists(todo, filters.id));
    }

    save(todoDTO) {
        let todo = {
            description : todoDTO.description,
            completed : todoDTO.completed,
        };

        return this._repository.save(todo)
            .then(todo => todoDTO.user.addTodo(todo))
            .then(todo => todo.reload())
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

        updatedTodo.user = todoDTO.user;

        return this._repository.findById({id : id, userId : todoDTO.user.id})
            .then(todo => this._validator.assertIfExists(todo, id))
            .then(todo => todo.update(updatedTodo));
    }

    delete(filters) {
        return this._repository.deleteById(filters)
            .then(rowsDeleted => this._validator.assertRowsNotEmpty(rowsDeleted, filters.id));
    }
}

module.exports = () => TodoService;