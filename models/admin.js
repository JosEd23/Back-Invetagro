'use strict'

//variables
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = Schema({
    nombres: {type: String, require: true},
    apellidos: {type: String, require: true},
    correo: {type: String, require: true, lowercase:true, unique:true},
    password: {type: String, require: true},
    telefono: {type: String, require: true},
    status: {type: String, require: true, default: 'INACTIVO'},
    rol: {type: String, require: true, default: 'EMPLEADO'},
    dpi: {type: String, require: true,  unique:true},
});

module.exports = mongoose.model('admin', AdminSchema);