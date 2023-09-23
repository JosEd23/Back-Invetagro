var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompraSchema = Schema({
    iduser: {type: Schema.ObjectId, ref: 'user'},
    idproveedor: {type: Schema.ObjectId, ref: 'proveedor'},
    fecha: {type: Date, default: Date.now},
    comprobante: String,
    num_comprobante: String,
});

module.exports = mongoose.model('compra',CompraSchema);