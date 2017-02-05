'use strict';

let todos = [{
    id : 1,
    description : 'Meet mom for lunch',
    completed : false
}, {
    id : 2,
    description : 'Go to market',
    completed : false
}, {
    id : 3,
    description : 'Feed the cat',
    completed : true
}];

class TodoApi {

    info(req, res) {
        res.send('Todo API Root');
    }
    
    listAll(req, res) {
        res.json(todos);
    }

    findById(req, res) {
        let filteredTodo = todos.filter(todo => todo.id === parseInt(req.params.id));
        let todo = filteredTodo[0];

        if(!todo) {
            res.status(404).send();
            return;
        }
        res.json(todo);
    }
}

module.exports = () => TodoApi;