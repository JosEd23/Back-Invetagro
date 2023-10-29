'use strict'

//variables
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactoSchema = Schema({
    cliente: {type: String, require: true},
    mensaje: {type: String, require: true},
    asunto: {type: String, require: true},
    telefono: {type: String, require: true},
    correo: {type: String, require: true},
    estado: {type: String, require: true},
    createdAt:{type:Date, default: Date.now, require:true}
});

module.exports = mongoose.model('contacto', ContactoSchema);