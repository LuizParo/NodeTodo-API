'use strict';

class UserService {

    constructor(repository, validator) {
        this._repository = repository;
        this._validator = validator;
    }

    save(userDTO) {
        let user = {
            email : userDTO.email,
            password : userDTO.password
        };

        return this._repository.save(user)
            .then(todo => todo.id);
    }

    login(filters) {
        return this._validator.assertIfFiltersAreValid(filters)
            .then(user => this._repository.find(filters))
            .then(user => this._validator.assertIfExists(user, filters.email))
            .then(user => user.checkIfPasswordMatches(filters.password));
    }
}

module.exports = () => UserService;