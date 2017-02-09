'use strict';

let bodyParser = require('body-parser');
let consign = require('consign');
let express = require('express');

let app = express();

app.use(express.static('./public'));
app.use(bodyParser.json());

consign({cwd : 'app'})
    .include('todo/services')
    .then('todo/api')
    .then('todo/routes')
    .into(app);

module.exports = app;