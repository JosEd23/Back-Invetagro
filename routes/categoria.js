'use strict'

//variables
var express = require('express');
var CategoriaController = require('../controllers/CategoriaController');

var api = express.Router();
var auth = require('../middlewares/authenticate');

//---APIS ADMIN
api.get('/listar_categoria_filtro_admin/:tipo/:filtro?',auth.auth,CategoriaController.listar_categoria_filtro_admin);
api.post('/registro_categoria_admin/',auth.auth,CategoriaController.registro_categoria_admin);
api.get('/obtener_categoria_admin/:id', auth.auth,CategoriaController.obtener_categoria_admin);
api.put('/actualizar_categoria_admin/:id',auth.auth,CategoriaController.actualizar_categoria_admin);
api.delete('/eliminar_categoria_admin/:id',auth.auth,CategoriaController.eliminar_categoria_admin);

//---APIS PUBLICAS
api.get('/listar_categoria_publico/:filtro?',CategoriaController.listar_categoria_publico);

module.exports = api

