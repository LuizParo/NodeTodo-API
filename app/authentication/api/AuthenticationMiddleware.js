'use strict';

class AuthenticationMiddleware {

    constructor(userService, errorHandler) {
        this._userService = userService;
        this._errorHandler = errorHandler;
    }

    requireAuthentication(req, res, next) {
        this._userService.authenticateToken(req.get('Auth'))
            .then(data => {
                req.user = data.user;
                req.token = data.token;

                next();
            })
            .catch(error => {
                let errorResponse = this._errorHandler.handle(error);
                res.status(errorResponse.status).json(errorResponse);
            });
    }
}

module.exports = () => AuthenticationMiddleware;