'use strict'

var Producto = require('../models/producto');
// var Inventario = require('../models/inventario');
var fs = require('fs');
var path = require('path');


const registro_producto_admin = async function(req, res){
    if(req.user){
        if(req.user.rol == 'ADMIN'){
            //Solicitud para cargar imagen
            let data = req.body;
             //Guardar registro en la bd
            var img_path = req.files.portada.path;
            var name = img_path.split('\\');
            var portada_name = name[2];

            data.slug = data.titulo.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,''); 
            data.portada = portada_name;
            let reg = await Producto.create(data);

            res.status(200).send({data:reg});

            // //Registro de inventario automatico
            // let inventario = await Inventario.create({
            //     admin: req.user.sub,
            //     cantidad: data.stock,
            //     proveedor: data.proveedor,
            //     producto: reg._id
            // });

            // codigo: {type: String, required: true },
            // titulo: {type: String, required: true},
            // slug: {type: String, required: true},
            // descripcion: {type: String, required: true},
            // galeria: [{type: object, required: false}],
            // precio_compra: {type: Number, required: true},
            // precio_venta: {type: Number, required: true},
            // stock: {type: Number, required: true},
            // nventas: {type: Number, default:0, required: true},
            // npuntos: {type: Number, default:0, required: true},
            // estado: {type: String, default: 'Edicion', required: true},
            // fecha_vencimiento: {type: String, required: true},
            // idcategoria: {type: Schema.ObjectId, ref: 'categoria'},
            // idmarca: {type: Schema.ObjectId, ref: 'marca'},

            // res.status(200).send({data:reg, inventario:inventario});
        }else{
            res.status(500).send({message: 'No tienes acceso'});
        }
    }else{
        res.status(500).send({message: 'No tienes acceso' });
    }

}

const listar_productos_admin = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'ADMIN') {
            var filtro = req.params['filtro'];

            // Utiliza populate para obtener los datos de categoría y marca
            let reg = await Producto.find({ titulo: new RegExp(filtro, 'i') })
                .populate('idcategoria')
                .populate('idmarca');

            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'No tienes acceso' });
        }
    } else {
        res.status(500).send({ message: 'No tienes acceso' });
    }
}


//Metodo que devuelve la URL de la imagen
const obtener_portada = async function(req, res){
    var img = req.params['img'];

    fs.stat('./uploads/productos/'+img,function(err){
        if(!err){
            let path_img = './uploads/productos/'+img;
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img = './uploads/default.png';
            res.status(200).sendFile(path.resolve(path_img));
        }
    });
}

//Metodo para obtener producto para actualizarlo
const obtener_producto_admin = async function (req, res){
    if(req.user){
        if(req.user.rol == 'ADMIN'){

            var id = req.params['id'];
            
            try {
                var reg = await Producto.findById({_id:id});
                res.status(200).send({data:reg});
                
            } catch (error) {
                res.status(200).send({data:undefined});
            }


        }else{
            res.status(500).send({message:'No access'});
        }
    }else{
        res.status(500).send({message:'No access'});
    }
}

const actualizar_producto_admin = async function(req, res){
    if(req.user){
        if(req.user.rol == 'ADMIN'){
            
            let id = req.params['id'];
            let data = req.body;

            
            //Validar que se este pasando una imagen
            if(req.files){
                //SI HAY IMAGEN
                 //Guardar registro en la bd
                var img_path = req.files.portada.path;
                var name = img_path.split('\\');
                var portada_name = name[2];

                let reg= await Producto.findByIdAndUpdate({_id:id},{
                    codigo: data.codigo,
                    titulo: data.titulo,
                    precio_venta: data.precio_venta,
                    presentacion: data.presentacion,
                    idcategoria: data.idcategoria,
                    idmarca: data.idmarca,
                    contenido: data.contenido,
                    descripcion: data.descripcion,
                    portada: portada_name
                });
                //PARA ELIMINAR UNA IMAGEN
                fs.stat('./uploads/productos/'+reg.portada,function(err){
                    if(!err){
                        fs.unlink('./uploads/productos/'+reg.portada,(err)=>{
                            if(err) throw err;
                        });
                    }
                });

                res.status(200).send({data:reg}); 
            }else{
                //NO HAY IMAGEN
                let reg= await Producto.findByIdAndUpdate({_id:id},{
                    codigo: data.codigo,
                    titulo: data.titulo,
                    precio_venta: data.precio_venta,
                    presentacion: data.presentacion,
                    idcategoria: data.idcategoria,
                    idmarca: data.idmarca,
                    contenido: data.contenido,
                    descripcion: data.descripcion,
                });
                res.status(200).send({data:reg});
            }


        }else{
            res.status(500).send({message: 'No tienes acceso'});
        }
    }else{
        res.status(500).send({message: 'No tienes acceso' });
    }

}

const eliminar_producto_admin = async function(req, res){
    if(req.user){
        if(req.user.rol == 'ADMIN'){

            var id = req.params['id']

            let reg=await Producto.findByIdAndRemove({_id:id});
            res.status(200).send({data:reg});
            
           
        }else{
            res.status(500).send({message:'No access'});
        }
    }else{
        res.status(500).send({message:'No access'});
    }
}

// //Metodo para eliminar producto
// const eliminar_producto_admin = async function(req,res){
//     if(req.user){
//        if(req.user.role == 'admin'){
//         var id= req.params['id'];

//         let reg =await Producto.findByIdAndRemove({id:id});
//         res.status(200).send({data:reg});
//        }else{
//         res.status(500).send({message:'Sin acceso'})
//        }
//     }else{
//         res.status(500).send({message:'Sin acceso'})
//     }
// }

// //Metodo para listar productos de inventario
// const listar_inventario_producto_admin = async function(req, res){
//     if(req.user){
//         if(req.user.role == 'admin'){
         
//             var id= req.params['id'];
            
//             var reg = await Inventario.find({producto: id}.populate('admin','proveedor'));
//             res.stat(200).send({data: reg});
       
//         }else{
//          res.status(500).send({message:'Sin acceso'})
//         }
//      }else{
//          res.status(500).send({message:'Sin acceso'})
//      }

// }

// //Metodo para eliminar productos de inventario
// const eliminar_inventario_producto_admin = async function(req, res){
//     if(req.user){
//         if(req.user.role == 'admin'){
//             //Obtener id de inventario
//             var id= req.params['id'];
//             //Eliminar inventario
//            let reg = await Inventario.findByIdAndRemove({_id:id});
//             //Obtener el registro del producto
//            let prod = await Producto.findById({_id:reg.producto});
//             //Calcular el nuevo stock
//            let nuevo_stock = parseInt(prod.stock) - parseInt(reg.cantidad);
//             //Actualizacion del nuevo stock al producto
//            let producto = await Producto.findByAndUpdate({_id:reg.producto},{
//             stock: nuevo_stock
//            })

//            res.status(200).send({data:producto});
       
//         }else{
//          res.status(500).send({message:'Sin acceso'})
//         }
//      }else{
//          res.status(500).send({message:'Sin acceso'})
//      }
// }

// //Metodo para registrar inventario

// const registro_inventario_producto_admin = async function(req, res){
//     if(req.user){
//         if(req.user.role == 'admin'){
         
//             let data = req.body;

//             let reg = await Inventario.create(data);
//             //Obtener el registro del producto
//             let prod = await Producto.findById({_id:reg.producto});
//             //Calcular el nuevo stock
//                                       //Stockactual   //Stock aumentar
//             let nuevo_stock = parseInt(prod.stock) + parseInt(reg.cantidad);
//             //Actualizacion del nuevo stock al producto
//             let producto = await Producto.findByAndUpdate({_id:reg.producto},{
//                 stock: nuevo_stock
//             })
            
            
//             res.status(200).send9({data:reg});
            
           
       
//         }else{
//          res.status(500).send({message:'Sin acceso'})
//         }
//      }else{
//          res.status(500).send({message:'Sin acceso'})
//      }

// }

module.exports = {
    registro_producto_admin,
    listar_productos_admin,
    obtener_portada,
    obtener_producto_admin,
    actualizar_producto_admin,
    eliminar_producto_admin
    // actualiza_producto_admin,
    // eliminar_producto_admin,
    // listar_inventario_producto_admin,
    // eliminar_inventario_producto_admin,
    // registro_inventario_producto_admin
}