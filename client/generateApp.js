const fs = require('fs');
const express = require('express');
const clientApp = express();
const bodyParser = require('body-parser');

// express server port setting
const port = process.env.PORT || 8080;

// ezpress basic uses
clientApp.use(bodyParser.urlencoded({
    extended: true
}));
clientApp.use(bodyParser.json());
clientApp.use('/', express.static('.'));

clientApp.listen(port, () => {
    console.log('http://localhost:' + port + ' is generated');
});
