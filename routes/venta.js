var express = require('express');
var ventaController = require('../controllers/VentaController');

var api = express.Router();

api.post('/venta/registrar',ventaController.registrar);
api.get('/venta/:id',ventaController.datos_venta);
api.get('/ventas',ventaController.listado_venta);
api.get('/pedidos',ventaController.listado_pedido);
api.get('/venta/data/:id',ventaController.detalles_venta);
api.get('/contar',ventaController.contar);
module.exports = api;