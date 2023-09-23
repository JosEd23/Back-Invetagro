'use strict'

//variables
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InventarioSchema = Schema({
    //Hacemos referencia a las colecciones que se necesitan para este modelo.
    producto: {type: Schema.ObjectId, ref: 'producto', require: true},
    cantidad: {type: Number, require:true },
    admin: {type: Schema.ObjectId, ref: 'admin', require: true},
    proveedor: {type: Schema.ObjectId, ref: 'proveedor', require: true},
    createdAt:{type:Date, default: Date.now, require:true}
});

module.exports = mongoose.model('inventario', InventarioSchema);