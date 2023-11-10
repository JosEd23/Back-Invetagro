'use strict'

//variables
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InventarioSchema = Schema({
    //Hacemos referencia a las colecciones que se necesitan para este modelo.
    producto: {type: Schema.ObjectId, ref: 'producto', require: true},
    admin: {type: Schema.ObjectId, ref: 'admin'},
    idproveedor: {type: Schema.ObjectId, ref: 'proveedor', require: true},
    cantidad: {type: Number, require:true },
    tipo_documento: {type: String, require:false },
    no_documento: {type: String, require:false },
    fecha:{type: String, require: true},
    fecha_exp: {type: String, require:true},
    createdAt:{type:Date, default: Date.now, require:true}
});

module.exports = mongoose.model('inventario', InventarioSchema);