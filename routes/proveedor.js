var express = require('express');
var proveedorController = require('../controllers/ProveedorController');

var api = express.Router();

api.get('/proveedor/:nombres?', proveedorController.listar);
api.post('/proveedor/registrar', proveedorController.registrar);
api.put('/proveedor/editar/:id', proveedorController.editar);
api.delete('/proveedor/eliminar/:id', proveedorController.eliminar);
api.get('/provedor/:id', proveedorController.obtener)

module.exports = api;