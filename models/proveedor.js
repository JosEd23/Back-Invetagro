'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProveedorSchema = Schema({ 
    nombres:{type: String, require:true},
    nit:{type: String, require:true},
    telefono:{type: Number, require:true},
    vendedor:{type: String, require:true},
    direccion:{type: String, require:true},
    createAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('proveedor',ProveedorSchema);