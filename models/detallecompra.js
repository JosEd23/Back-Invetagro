'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DetalleCompraSchema = Schema({
    idproducto: {type: Schema.ObjectId, ref: 'producto', require: true},
    cantidad: {type: Number, require:true },
    fecha_exp: {type: String, require:true},
    encabezado_compra: {type:Schema.ObjectId, ref:'compra'},\
    createAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('detallecompra',DetalleCompraSchema);