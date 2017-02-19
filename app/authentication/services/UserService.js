'use strict';

class UserService {

    constructor(userRepository, tokenRepository, validator) {
        this._userRepository = userRepository;
        this._tokenRepository = tokenRepository;
        this._validator = validator;
    }

    save(userDTO) {
        let user = {
            email : userDTO.email,
            password : userDTO.password
        };

        return this._userRepository.save(user)
            .then(todo => todo.id);
    }

    login(filters) {
        let loggedUser;

        return this._validator.assertIfFiltersAreValid(filters)
            .then(user => this._userRepository.find(filters))
            .then(user => this._validator.assertIfExists(user, filters.email))
            .then(user => user.checkIfPasswordMatches(filters.password))
            .then(user => {
                loggedUser = user;
                return user.generateToken('authentication');
            })
            .then(token => this._tokenRepository.save(token))
            .then(tokenIntance => {
                return {
                    user : loggedUser,
                    token : tokenIntance.token
                };
            });
    }

    authenticateToken(token) {
        return this._userRepository.findByToken(token)
            .then(user => this._validator.validateIfUserWasFoundByToken(user));
    }
}

module.exports = () => UserService;