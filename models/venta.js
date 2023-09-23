var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VentaSchema = Schema({
    idcliente: {type: Schema.ObjectId, ref: 'cliente'},
    iduser: {type: Schema.ObjectId, ref: 'user'},
    fecha: {type: Date, default: Date.now},
    pago: String,
    comprobante: String,
    num_comprobante: String,
});

module.exports = mongoose.model('venta',VentaSchema);