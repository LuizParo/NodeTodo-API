'use strict';

let TodoNotFoundException = require('../exceptions/TodoNotFoundException');

class TodoValidator {

    assertIfExists(todo, id) {
        return new Promise((resolve, reject) => {
            try {
                if(!!todo) {
                    throw new TodoNotFoundException(`Todo with id ${id} not found!`);
                }

                resolve(todo);
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }
}

module.exports = () => TodoValidator;