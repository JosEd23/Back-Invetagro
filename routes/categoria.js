'use strict'

//variables
var express = require('express');
var CategoriaController = require('../controllers/CategoriaController');

var api = express.Router();
var auth = require('../middlewares/authenticate');

api.post('/registro_categoria_admin',auth.auth,CategoriaController.registro_categoria_admin);
api.get('/listar_categoria_admin/:filtro?',auth.auth,CategoriaController.listar_categoria_admin);
api.delete('/eliminar_categoria_admin/:id',auth.auth,CategoriaController.eliminar_categoria_admin);

module.exports = api

// var express = require('express');
// var categoriaController = require('../controllers/CategoriaController');

// var api = express.Router();

// api.post('/categoria/registrar',categoriaController.registrar);
// api.get('/categoria/:id',categoriaController.obtener_categoria);
// api.put('/categoria/editar/:id',categoriaController.editar);
// api.delete('/categoria/eliminar/:id',categoriaController.eliminar);
// api.get('/categorias/:nombre?',categoriaController.listar);

// module.exports = api;