'use strict';

class UserApi {

    constructor(service) {
        this._service = service;
    }

    save(req, res) {
        return this._service.save(req.body)
            .then(userId => {
                res.location(`${req.get('host')}/users/${userId}`);
                res.sendStatus(201);
            })
            .catch(error => this._handleError(res, error));
    }

    _handleError(res, error) {
        console.log(error);

        let obj = {
            status : error.status || 500,
            message : error.message
        };

        if(error.errors && error.errors.length) {
            obj.errors = error.errors;
        }

        res.status(obj.status).json(obj);
    }
}

module.exports = () => UserApi;