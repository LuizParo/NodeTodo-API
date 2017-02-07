'use strict';

module.exports = function(app) {
    let api = new app.api.TodoApi();

    app.get('/', api.info);

    app.get('/todos', api.listAll);

    app.get('/todos/:id', api.findById);

    app.post('/todos', api.save);

    app.put('/todos/:id', api.update);

    app.delete('/todos/:id', api.delete);
};