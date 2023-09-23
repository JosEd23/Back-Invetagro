'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var ProductoSchema = Schema({
    codigo: {type: String, required: true },
    titulo: {type: String, required: true},
    slug: {type: String, required: true},
    descripcion: {type: String, required: true},
    galeria: [{type: object, required: false}],
    precio_compra: {type: Number, required: true},
    precio_venta: {type: Number, required: true},
    stock: {type: Number, required: true},
    nventas: {type: Number, default:0, required: true},
    npuntos: {type: Number, default:0, required: true},
    estado: {type: String, default: 'Edicion', required: true},
    fecha_vencimiento: {type: String, required: true},
    idcategoria: {type: Schema.ObjectId, ref: 'categoria'},
    idmarca: {type: Schema.ObjectId, ref: 'marca'},
});

module.exports = mongoose.model('producto',ProductoSchema);