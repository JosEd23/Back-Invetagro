var express = require('express');
var marcaController = require('../controllers/MarcaController');

var api = express.Router();
var auth = require('../middlewares/authenticate');



api.get('/listar_marca_filtro_admin/:tipo/:filtro?',auth.auth,marcaController.listar_marca_filtro_admin);
api.post('/registro_marca_admin/',auth.auth,marcaController.registro_marca_admin);
api.get('/obtener_marca_admin/:id', auth.auth,marcaController.obtener_marca_admin);
api.put('/actualizar_marca_admin/:id',auth.auth,marcaController.actualizar_marca_admin);
api.delete('/eliminar_marca_admin/:id',auth.auth,marcaController.eliminar_marca_admin);




// api.post('/marca/registrar',marcaController.registrar);
// api.get('/marca/:id',marcaController.obtener_marca);
// api.put('/marca/editar/:id',marcaController.editar);
// api.delete('/marca/eliminar/:id',marcaController.eliminar);
// api.get('/marca/:nombre?',marcaController.listar);

module.exports = api;