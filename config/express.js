'use strict';

let bodyParser = require('body-parser');
let consign = require('consign');
let express = require('express');

let app = express();

app.use(express.static('./public'));
app.use(bodyParser.json());

consign({cwd : 'app'})
    .include('todo/models')
    .then('todo/validators')
    .then('todo/repositories')
    .then('todo/services')
    .then('todo/api')
    .then('todo/routes')

    .then('authentication/models')
    .then('authentication/repositories')
    .then('authentication/services')
    .then('authentication/api')
    .then('authentication/routes')
    
    .into(app);

module.exports = app;