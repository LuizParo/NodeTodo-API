'use strict';

class AuthenticationMiddleware {

    constructor(userService, errorHandler) {
        this._userService = userService;
        this._errorHandler = errorHandler;
    }

    requireAuthentication(req, res, next) {
        this._userService.authenticateToken(req.get('Auth'))
            .then(user => {
                req.user = user;
                next();
            })
            .catch(error => {
                let errorResponse = this._errorHandler.handle(error);
                res.status(errorResponse.status).json(errorResponse);
            });
    }
}

module.exports = () => AuthenticationMiddleware;