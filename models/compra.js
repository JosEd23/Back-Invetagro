'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompraSchema = Schema({
    admin: {type: Schema.ObjectId, ref: 'ADMIN'},
    idproveedor: {type: Schema.ObjectId, ref: 'proveedor', require: true},
    fecha: {type: String, require: true},
    tipo_documento: {type: String, require:false },
    no_documento: {type: String, require:false },
    createdAt:{type:Date, default: Date.now, require:true}
});

module.exports = mongoose.model('compra',CompraSchema);