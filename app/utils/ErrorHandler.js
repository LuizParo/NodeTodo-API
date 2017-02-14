'use strict';

class ErrorHandler {

    handle(error) {
        console.log(error);

        let obj = {
            status : error.status || 500,
            message : error.message
        };

        if(error.errors && error.errors.length) {
            obj.errors = error.errors;
        }

        return obj;
    }
}

module.exports = () => ErrorHandler;