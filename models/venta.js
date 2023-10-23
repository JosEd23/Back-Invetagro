var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VentaSchema = Schema({
    idcliente: {type: Schema.ObjectId, ref: 'cliente'},
    nventa: {type: String, require:true},
    subtotal: {type:Number, require:true},
    envio_titulo: {type: String, require:true},
    envio_precio: {type:Number, require:true},
    titulo_pago: {type: String, require:true},
    cupon: {type: String, require:true},
    estado: {type: String, require:true},
    nota: {type: String, require:true},
    direccion: {type: Schema.ObjectId, ref: 'direccion'},
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('venta',VentaSchema);