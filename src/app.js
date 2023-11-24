//DEPENDENCIES
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/index')
const hbs = require('hbs');
//IMPORTS
const server = express();

//SERVER
server.use(bodyParser.json());
server.use(morgan('dev'));
server.use(cors());
server.use(express.urlencoded({ extended: true }))
server.use('/', router)

// Motor de plantilla
hbs.registerPartials(__dirname + '/views/partials', function (err) {
    if (err) {
        console.log('Ha ocurrido un error:', err);
    } else {
        console.log('Plantillas parciales registradas con éxito.');
    }
});
server.set('view engine', 'hbs');
server.set("views", __dirname + "/views");

server.use(express.static(__dirname + '/public'));


module.exports = server;