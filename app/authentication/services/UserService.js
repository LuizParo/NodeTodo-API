'use strict';

class UserService {

    constructor(userRepository, tokenRepository, userValidator, tokenValidator) {
        this._userRepository = userRepository;
        this._tokenRepository = tokenRepository;
        this._userValidator = userValidator;
        this._tokenValidator = tokenValidator;
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

        return this._userValidator.assertIfFiltersAreValid(filters)
            .then(user => this._userRepository.find(filters))
            .then(user => this._userValidator.assertIfExists(user, filters.email))
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

    logout(token) {
        return this._tokenRepository.remove(token);
    }

    authenticateToken(token) {
        let recoveredToken;

        return this._tokenRepository.findByToken(token)
            .then(tokenInstance => this._tokenValidator.validateIfTokenWasFound(tokenInstance))
            .then(tokenInstance => {
                recoveredToken = tokenInstance;
                return this._userRepository.findByToken(token)
            })
            .then(user => this._userValidator.validateIfUserWasFoundByToken(user))
            .then(user => {
                console.log(JSON.stringify(recoveredToken));

                return {
                    user : user,
                    token : recoveredToken
                };
            });
    }
}

module.exports = () => UserService;