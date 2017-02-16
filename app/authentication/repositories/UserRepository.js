'use strict';

class UserRepository {

    constructor(user) {
        this._user = user;
    }

    save(user) {
        return this._user.create(user);
    }

    find(filters) {
        return this._user.findOne({
            where : {
                email : filters.email
            }
        });
    }
}

module.exports = () => UserRepository;