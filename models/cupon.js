'use strict'

//variables
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CuponSchema = Schema({
    //Hacemos referencia a las colecciones que se necesitan para este modelo.
    codigo: {type: String, require:true},
    tipo: {type: String, require:true}, // Sera un valor en porcentaje o en un precio fijo
    valor: {type: Number, require:true},
    limite: {type: Number, require:true},
    createdAt:{type:Date, default: Date.now, require:true}
});

module.exports = mongoose.model('cupon', CuponSchema);