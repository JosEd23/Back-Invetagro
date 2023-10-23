var Venta = require('../models/venta');
var DetalleVenta = require('../models/detalleventa');

const registro_compra_cliente = async function (req, res) {
    if(req.user){
        
        var data = req.body;
        var detalles = data.detalles;
        var d_detalles = [];

        let venta = await Venta.create(data);

        detalles.forEach( async element => {
            await DetalleVenta.create(element);
            d_detalles.push(element);
        });
  
         res.status(200).send({venta:venta, detalleventa:d_detalles});
      }else{
          res.status(500).send({message:'No access'});
      }
}









module.exports = {
    registro_compra_cliente 
}