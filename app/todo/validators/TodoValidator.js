'use strict';

let TodoNotFoundException = require('../exceptions/TodoNotFoundException');

class TodoValidator {

    assertIfExists(todo, id) {
        if(todo == null) {
            throw new TodoNotFoundException(`Todo with id ${id} not found!`);
        }

        return todo;
    }

    assertRowsNotEmpty(rows, id) {
        if(rows === 0) {
            throw new TodoNotFoundException(`Todo with id ${id} not found!`);
        }

        return rows;
    }
}

module.exports = () => TodoValidator;