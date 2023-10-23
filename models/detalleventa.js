var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DetalleVentaSchema = Schema({
    idcliente: {type: Schema.ObjectId, ref: 'cliente'},
    idproducto: {type: Schema.ObjectId, ref: 'producto'},
    idventa: {type: Schema.ObjectId, ref: 'venta'},
    subtotal: {type:Number, require:true},
    cantidad: {type:Number, require:true},
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('detalleventa',DetalleVentaSchema);

