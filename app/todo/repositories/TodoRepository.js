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

    findAll(filters) {
        let where = {};

        if(filters.hasOwnProperty('completed')) {
            where.completed = filters.completed === 'true';
        }

        if(filters.hasOwnProperty('q') && filters.q.length) {
            where.description = {
                $like : `%${filters.q}%`
            };
        }

        return this._todo.findAll({where : where});
    }
}

module.exports = () => TodoRepository;