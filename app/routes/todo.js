'use strict';

module.exports = app => {
    let api = new app.api.TodoApi();

    app.get('/', api.info);

    app.get('/todos', api.listAll);

    app.get('/todos/:id', api.findById);
};