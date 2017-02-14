'use strict';

class UserService {

    constructor(repository) {
        this._repository = repository;
    }

    save(userDTO) {
        let user = {
            email : userDTO.email,
            password : userDTO.password
        };

        return this._repository.save(user)
            .then(todo => todo.id);
    }
}

module.exports = () => UserService;