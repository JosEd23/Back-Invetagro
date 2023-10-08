'use strict'

//variables
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InventarioSchema = Schema({
    //Hacemos referencia a las colecciones que se necesitan para este modelo.
    producto: {type: Schema.ObjectId, ref: 'producto', require: true},
    cantidad: {type: Number, require:true },
    tipo_documento: {type: String, require:false },
    no_documento: {type: String, require:false },
    admin: {type: Schema.ObjectId, ref: 'ADMIN', require: true},
    proveedor: {type: Schema.ObjectId, ref: 'proveedor', require: true},
    fecha: {type: String, require: true},
    createdAt:{type:Date, default: Date.now, require:true}
});

module.exports = mongoose.model('inventario', InventarioSchema);