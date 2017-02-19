'use strict';

class TodoRepository {

    constructor(todo) {
        this._todo = todo;
    }

    save(todo) {
        return this._todo.create(todo);
    }

    findById(filters) {
        return this._todo.findOne({
            where : {
                id : filters.id,
                userId : filters.userId
            }
        });
    }

    findAll(filters) {
        let where = {userId : filters.userId};

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

    deleteById(filters) {
        return this._todo.destroy({
            where : {
                id : filters.id,
                userId : filters.userId
            }
        });
    }
}

module.exports = () => TodoRepository;