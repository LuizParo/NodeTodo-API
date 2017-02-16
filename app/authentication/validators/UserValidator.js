'use strict';

let UserNotFoundException = require('../exceptions/UserNotFoundException');

class UserValidator {

    assertIfFiltersAreValid(filters) {
        return new Promise((resolve, reject) => {
            if(typeof filters.email !== 'string' || typeof filters.password !== 'string') {
                reject(`The 'email' and 'password' fields must be text!`);
            }

            resolve(filters);
        });
    }

    assertIfExists(user, email) {
        if(user == null) {
            throw new UserNotFoundException(`User with email ${email} not found!`);
        }

        return user;
    }
}

module.exports = () => UserValidator;