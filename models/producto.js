'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var ProductoSchema = Schema({
    codigo: {type: String, required: true },
    titulo: {type: String, required: true},
    presentacion: {type: String},
    slug: {type: String, required: true},
    contenido: {type:String, required:true},
    descripcion: {type: String, required: true},
    contenido: {type: String, required: true},
    galeria: [{type: Object, required: false}], //Array de fotos
    portada: {type: String, required:true},
    precio_compra: {type: Number, default:0, required: true},
    precio_venta: {type: Number, required: true},
    stock: {type: Number, default:0, required: true},
    nventas: {type: Number, default:0, required: true},
    npuntos: {type: Number, default:0, required: true},
    estado: {type: String, default: 'Edicion', required: true},
    fecha_vencimiento: {type: String, default:0, required: true},
    idcategoria: {type: Schema.ObjectId, ref: 'categoria'},
    idmarca: {type: Schema.ObjectId, ref: 'marca'},
});

module.exports = mongoose.model('producto',ProductoSchema);