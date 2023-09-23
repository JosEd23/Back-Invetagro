var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProveedorSchema = Schema({
    nombres: String,
    telefono: Number,
    vendedor: String,
    direccion: String,
    
    createAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('proveedor',ProveedorSchema);