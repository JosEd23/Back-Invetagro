'use strict'

//variables
var express = require('express');
var adminController = require('../controllers/AdminController');
var api = express.Router();
var auth = require('../middlewares/authenticate');

api.post('/registro_admin',adminController.registro_admin);
api.post('/login_admin',adminController.login_admin);

api.get('/obtener_mensaje_admin',auth.auth, adminController.obtener_mensaje_admin);
api.put('/cerrar_mensaje_admin', auth.auth, adminController.cerrar_mensaje_admin);

module.exports = api;