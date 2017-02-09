'use strict';

module.exports = function(app) {
    let service = new app.todo.services.TodoService();
    let api = new app.todo.api.TodoApi(service);

    app.get('/', api.info);

    app.get('/todos', (req, res) => api.list(req, res));

    app.get('/todos/:id', (req, res) => api.findById(req, res));

    app.post('/todos', (req, res) => api.save(req, res));

    app.put('/todos/:id', (req, res) => api.update(req, res));

    app.delete('/todos/:id', (req, res) => api.delete(req, res));
};