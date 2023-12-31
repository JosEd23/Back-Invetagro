'use strict'

//variables
var express = require('express');
var clienteController = require('../controllers/ClienteController');

var api = express.Router();
var auth = require('../middlewares/authenticate');

api.post('/registro_cliete',clienteController.registro_cliete);
api.post('/login_cliente',clienteController.login_cliente);

api.get('/listar_clientes_filtro_admin/:tipo/:filtro?',auth.auth,clienteController.listar_clientes_filtro_admin);
api.post('/registro_cliente_admin/',auth.auth,clienteController.registro_cliente_admin);
api.get('/obtener_cliente_admin/:id', auth.auth,clienteController.obtener_cliente_admin);
api.put('/actualizar_cliente_admin/:id',auth.auth,clienteController.actualizar_cliente_admin);
api.delete('/eliminar_cliente_admin/:id',auth.auth,clienteController.eliminar_cliente_admin);
api.get('/obtener_cliente_guest/:id', auth.auth, clienteController.obtener_cliente_guest);
api.put('/actualizar_perfil_cliente_guest/:id', auth.auth, clienteController.actualizar_perfil_cliente_guest);

//Direcciones
api.post('/registro_direccion_cliente/',auth.auth, clienteController.registro_direccion_cliente);
api.get('/listar_direccion_cliente/:id', auth.auth, clienteController.listar_direccion_cliente);

//Contacto
api.post('/enviar_mensaje_contacto', clienteController.enviar_mensaje_contacto);

//Ordenes
// api.get('/obtener_ordenes_clientes/:id', auth.auth,clienteController.obtener_ordenes_clientes);
api.get('/obtener_detalles_ordenes_clientes/:id', auth.auth, clienteController.obtener_detalles_ordenes_clientes);

module.exports = api;
