var Venta = require('../models/venta');
var DetalleVenta = require('../models/detalleventa');
var Producto = require('../models/producto');
var Carrito = require('../models/carrito');

// const registro_compra_cliente = async function (req, res) {
//     if(req.user){
        
//         var data = req.body;
//         var detalles = data.detalles;

//         // console.log(data);

//         var venta_last = await Venta.find().sort({createdAt: -1});
//         var serie;
//         var correlativo;
//         var n_venta;


//         if(venta_last.length == 0){
//             serie = '001';
//             correlativo = '000001';

//             n_venta = serie + '-' + correlativo;
//         }else{
//             //Cuando ya hay mas de un registro
//             var last_nventa = venta_last[0].nventa;
//             var arr_nventa = last_nventa.split('-');

//             if(arr_nventa[1] != '999999'){
//                 var nuevo_correlativo = zfill(parseInt(arr_nventa[1])+1,6);
//                 n_venta = arr_nventa[0] + '-' + nuevo_correlativo;
//             }else if(arr_nventa[1] == '999999'){
//                 var nuevo_serie = zfill(parseInt(arr_nventa[0])+1,3);
//                 n_venta = nuevo_serie[0] + '-000001';
//             }
//         }

//         data.nventa = n_venta;
//         data.estado = 'Procesando';

//         let venta = await Venta.create(data);

//         detalles.forEach(async element => {
//             element.venta = venta._id;
//             await DetalleVenta.create(element);

//             //Actualiza producto en la base de datos
//             let element_producto = await Producto.findById({_id:element.idproducto});
//             let nuevo_stock = element_producto.stock - element.cantidad;

//             await Producto.findByIdAndUpdate({_id:element.idproducto},{
//                 stock:nuevo_stock
//             });

//              //Limpiando carrito
//             await Carrito.remove({cliente:data.cliente});
//         });
//         res.status(200).send({venta:venta});

//       }else{
//           res.status(500).send({message:'Sin acceso'});
//       }
// }

//Codigo con try catch
// const registro_compra_cliente = async function (req, res) {
//     try {
//         if (req.user) {
//             var data = req.body;
//             var detalles = data.detalles;

//             var venta_last = await Venta.find().sort({ createdAt: -1 });
//             var serie;
//             var correlativo;
//             var n_venta;

//             if (venta_last.length == 0) {
//                 serie = '001';
//                 correlativo = '000001';

//                 n_venta = serie + '-' + correlativo;
//             } else {
//                 var last_nventa = venta_last[0].nventa;
//                 var arr_nventa = last_nventa.split('-');

//                 if (arr_nventa[1] != '999999') {
//                     var nuevo_correlativo = zfill(parseInt(arr_nventa[1]) + 1, 6);
//                     n_venta = arr_nventa[0] + '-' + nuevo_correlativo;
//                 } else if (arr_nventa[1] == '999999') {
//                     var nuevo_serie = zfill(parseInt(arr_nventa[0]) + 1, 3);
//                     n_venta = nuevo_serie[0] + '-000001';
//                 }
//             }

//             data.nventa = n_venta;
//             data.estado = 'Procesando';

//             let venta = await Venta.create(data);

//             for (let i = 0; i < detalles.length; i++) {
//                 let element = detalles[i];
//                 element.venta = venta._id;
//                 await DetalleVenta.create(element);

//                 // Actualiza producto en la base de datos
//                 let element_producto = await Producto.findById({ _id: element.idproducto });
//                 let nuevo_stock = element_producto.stock - element.cantidad;

//                 await Producto.findByIdAndUpdate({ _id: element.idproducto },
//                     { stock: nuevo_stock });


//                 //Limpiando carrito
//                  await Carrito.remove({cliente:data.cliente});
//             }
//             res.status(200).send({ venta: venta });
//         } else {
//             res.status(500).send({ message: 'Sin acceso' });
//         }
//     } catch (error) {
//         console.error("Error en el proceso de registro de compra del cliente:", error);
//         res.status(500).send({ message: 'Se produjo un error durante el proceso de registro de la compra.' });
//     }
// };



const registro_compra_cliente = async function (req, res) {
    if (req.user) {
        try {
            var data = req.body;
            var detalles = data.detalles;

            var venta_last = await Venta.find().sort({ createdAt: -1 });
            var serie;
            var correlativo;
            var n_venta;

            if (venta_last.length == 0) {
                serie = '001';
                correlativo = '000001';
                n_venta = serie + '-' + correlativo;
            } else {
                var last_nventa = venta_last[0].nventa;
                var arr_nventa = last_nventa.split('-');

                if (arr_nventa[1] != '999999') {
                    var nuevo_correlativo = zfill(parseInt(arr_nventa[1]) + 1, 6);
                    n_venta = arr_nventa[0] + '-' + nuevo_correlativo;
                } else if (arr_nventa[1] == '999999') {
                    var nuevo_serie = zfill(parseInt(arr_nventa[0]) + 1, 3);
                    n_venta = nuevo_serie[0] + '-000001';
                }
            }

            data.nventa = n_venta;
            data.estado = 'Procesando';

            let venta = await Venta.create(data);

            for (const element of detalles) {
                element.venta = venta._id;
                await DetalleVenta.create(element);

                let element_producto = await Producto.findById(element.idproducto);
                let nuevo_stock = element_producto.stock - element.cantidad;

                await Producto.findByIdAndUpdate(element.idproducto, { stock: nuevo_stock });
            }

            // Limpiando carrito
            await Carrito.deleteMany({ cliente: data.cliente });

            res.status(200).send({ venta: venta });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Ha ocurrido un error en el servidor' });
        }
    } else {
        res.status(500).send({ message: 'Sin acceso' });
    }
};


function zfill(number, width) {
    var numberOutput = Math.abs(number); 
    var length = number.toString().length;
    var zero = "0";
    
    if (width <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }

    }
}







module.exports = {
    registro_compra_cliente 
}