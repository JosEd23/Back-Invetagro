'use strict'

//variables
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarritoSchema = Schema({
    //Hacemos referencia a las colecciones que se necesitan para este modelo.
    producto: {type: Schema.ObjectId, ref: 'producto', require: true},
    cliente: {type: Schema.ObjectId, ref: 'cliente', require: true},
    cantidad: {type: Number, require:true},
    variedad: {type: String, require: false},
    createdAt:{type:Date, default: Date.now, require:true}
});

module.exports = mongoose.model('carrito', CarritoSchema);