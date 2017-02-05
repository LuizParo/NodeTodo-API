'use strict';

let app = require('./config/express');

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running server on port ${PORT}`));