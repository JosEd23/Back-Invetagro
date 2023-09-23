'use strict'

//variables
var express = require('express');
var CuponController = require('../controllers/CuponController');

var api = express.Router();
var auth = require('../middlewares/authenticate');

api.post('/registro_cupon_admin',auth.auth,CuponController.registro_cupon_admin);
api.get('/listar_cupones_admin/:filtro?',auth.auth,CuponController.listar_cupones_admin);

module.exports = api;