'use strict';

class TodoRepository {

    constructor(todo) {
        this._todo = todo;
    }

    save(todo) {
        return this._todo.create(todo);
    }

    findById(id) {
        return this._todo.findById(id);
    }
}

module.exports = () => TodoRepository;