'use strict';

class TodoServiceFactory {

    constructor(app) {
        this._app = app;
    }

    create() {
        let todo = this._app.todo.models.Todo;
        let validator = new this._app.todo.validators.TodoValidator();
        let repository = new this._app.todo.repositories.TodoRepository(todo);
        
        return new this._app.todo.services.TodoService(validator, repository);
    }
}

module.exports = () => TodoServiceFactory;