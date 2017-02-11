'use strict';

let app = require('./config/express');
let database = require('./config/database');

database.sync({
    force : true
});

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running server on port ${PORT}`));