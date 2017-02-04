var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var todos = [{
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

app.get('/', (req, res) => {
    res.send('Todo API Root');
});

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.get('/todos/:id', (req, res) => {
    var filteredTodo = todos.filter(todo => todo.id === parseInt(req.params.id));
    var todo = filteredTodo[0];

    if(!todo) {
        res.status(404).send();
        return;
    }
    res.json(todo);
});

app.listen(PORT, () => console.log(`Running server on port ${PORT}`));