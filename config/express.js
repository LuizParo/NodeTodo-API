'use strict';

let bodyParser = require('body-parser');
let consign = require('consign');
let express = require('express');

let app = express();

app.use(express.static('./public'));
app.use(bodyParser.json());

consign({cwd : 'app'})
    .include('utils')

    .then('authentication/models')
    .then('authentication/validators')
    .then('authentication/repositories')
    .then('authentication/services')
    .then('authentication/factories')
    .then('authentication/api')
    .then('authentication/routes')
    
    .then('todo/models')
    .then('todo/validators')
    .then('todo/repositories')
    .then('todo/services')
    .then('todo/factories')
    .then('todo/api')
    .then('todo/routes')
    
    .into(app);

module.exports = app;