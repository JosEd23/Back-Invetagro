'use strict'

//variables
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
    nombres: {type: String, require: true},
    apellidos: {type: String, require: true},
    departamento: {type: String, require: true},
    municipio: {type: String, require: true},
    direccion: {type: String, require: true},
    correo: {type: String, require: true},
    password: {type: String, require: true},
    perfil: {type: String, default: 'perfil.png', require: true}, 
    telefono: {type: String, require: true},
    nacimiento: {type: String, require: true},
    dpi: {type: String, require: true},
    createdAt:{type:Date, default: Date.now, require:true}
});

module.exports = mongoose.model('cliente', ClienteSchema);