'use strict';

class UserRepository {

    constructor(user) {
        this._user = user;
    }

    save(user) {
        return this._user.create(user);
    }
}

module.exports = () => UserRepository;