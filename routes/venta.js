'use strict'

//variables
var express = require('express');
var VentaController = require('../controllers/VentaController');

var api = express.Router();
var auth = require('../middlewares/authenticate');


api.post('/registro_compra_cliente', auth.auth,VentaController.registro_compra_cliente);


module.exports = api;

