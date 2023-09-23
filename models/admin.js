'use strict'

//variables
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = Schema({
    nombres: {type: String, require: true},
    apellidos: {type: String, require: true},
    correo: {type: String, require: true},
    password: {type: String, require: true},
    telefono: {type: String, require: true},
    rol: {type: String, require: true},
    dpi: {type: String, require: true},
});

module.exports = mongoose.model('admin', AdminSchema);