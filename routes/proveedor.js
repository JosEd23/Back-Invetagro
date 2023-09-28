var express = require('express');
var proveedorController = require('../controllers/ProveedorController');

var api = express.Router();
var auth = require('../middlewares/authenticate');



api.get('/listar_proveedor_filtro_admin/:tipo/:filtro?',auth.auth,proveedorController.listar_proveedor_filtro_admin);
api.post('/registro_proveedor_admin/',auth.auth,proveedorController.registro_proveedor_admin);
api.get('/obtener_proveedor_admin/:id', auth.auth,proveedorController.obtener_proveedor_admin);
api.put('/actualizar_proveedor_admin/:id',auth.auth,proveedorController.actualizar_proveedor_admin);
api.delete('/eliminar_proveedor_admin/:id',auth.auth,proveedorController.eliminar_proveedor_admin);

// api.get('/proveedor/:nombres?', proveedorController.listar);
// api.post('/proveedor/registrar', proveedorController.registrar);
// api.put('/proveedor/editar/:id', proveedorController.editar);
// api.delete('/proveedor/eliminar/:id', proveedorController.eliminar);
// api.get('/provedor/:id', proveedorController.obtener)

module.exports = api;