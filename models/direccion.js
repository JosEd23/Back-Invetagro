'use strict'

//variables
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DireccionSchema = Schema({
    //Hacemos referencia a las colecciones que se necesitan para este m
    cliente: {type: Schema.ObjectId, ref: 'cliente', require: true},
    telefono: {type: String, require:false},
    destinatario: {type: String, require:false},
    direccion: {type: String, require:false},
    municipio: {type: String, require:false},
    departamento: {type: String, require:false},
    comentario: {type: String, require: false},
    createdAt:{type:Date, default: Date.now, require:true}
});

module.exports = mongoose.model('direccion', DireccionSchema);