var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DetalleCompraSchema = Schema({
    idproducto: {type: Schema.ObjectId, ref: 'producto'},
    cantidad: Number,
    compra: {type:Schema.ObjectId, ref:'compra'}
});

module.exports = mongoose.model('detallecompra',DetalleCompraSchema);