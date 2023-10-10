'use strict'

var Producto = require('../models/producto');
// var Inventario = require('../models/inventario');
var fs = require('fs');
var path = require('path');


const registro_producto_admin = async function (req, res) {
    if (req.user && req.user) {
      if (req.user.rol === "ADMIN") {
        const data = req.body;
        var img_path = req.files.portada.path;
        var name = img_path.split("\\");
        var portada_name = name[2];
  
        
        const productoExistente = await Producto.findOne({ codigo: data.codigo });
        if (productoExistente) {
          fs.unlinkSync(img_path); //no me guarda la foto
          // Si ya existe un producto con el mismo codigo, eliminar el archivo de la imagen
          res
            .status(400)
            .send({ message: "Ya existe un producto con este codigo." });
        } else {
          // Si no hay un producto con el mismo codigo, se crea el producto y guarda la imagen.
          const nuevoProducto = new Producto(data);
          nuevoProducto.slug = data.titulo
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
          nuevoProducto.portada = portada_name;
          try {
            await nuevoProducto.save(); // Guarda el producto en la base de datos
            // Envía una respuesta con el nuevo producto
            res.status(200).send({ data: nuevoProducto });
          } catch (error) {
            // Si hay un error al guardar el producto, elimina el archivo de la imagen y envía un mensaje de error
            fs.unlinkSync(img_path);
            res.status(500).send({ message: "Error al guardar el producto." });
          }
        }
      }
    }
  };

// const registro_producto_admin = async function(req, res){
//     if(req.user){
//         if(req.user.rol == 'ADMIN'){
//             //Solicitud para cargar imagen
//             let data = req.body;
//              //Guardar registro en la bd
//             var img_path = req.files.portada.path;
//             var name = img_path.split('\\');
//             var portada_name = name[2];

//             data.slug = data.titulo.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,''); 
//             data.portada = portada_name;
//             let reg = await Producto.create(data);

//             res.status(200).send({data:reg});

//             // //Registro de inventario automatico
//             // let inventario = await Inventario.create({
//             //     admin: req.user.sub,
//             //     cantidad: data.stock,
//             //     proveedor: data.proveedor,
//             //     producto: reg._id
//             // });

//             // codigo: {type: String, required: true },
//             // titulo: {type: String, required: true},
//             // slug: {type: String, required: true},
//             // descripcion: {type: String, required: true},
//             // galeria: [{type: object, required: false}],
//             // precio_compra: {type: Number, required: true},
//             // precio_venta: {type: Number, required: true},
//             // stock: {type: Number, required: true},
//             // nventas: {type: Number, default:0, required: true},
//             // npuntos: {type: Number, default:0, required: true},
//             // estado: {type: String, default: 'Edicion', required: true},
//             // fecha_vencimiento: {type: String, required: true},
//             // idcategoria: {type: Schema.ObjectId, ref: 'categoria'},
//             // idmarca: {type: Schema.ObjectId, ref: 'marca'},

//             // res.status(200).send({data:reg, inventario:inventario});
//         }else{
//             res.status(500).send({message: 'No tienes acceso'});
//         }
//     }else{
//         res.status(500).send({message: 'No tienes acceso' });
//     }

// }

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

//actualizar empleados
const actualizar_producto_admin = async function (req, res) {
    if (req.user && req.user.rol === "ADMIN") {
      const productoId = req.params.id; // Obtener el ID del producto de los parámetros de la URL
      const data = req.body; // Obtener los datos del cuerpo de la solicitud
  
      // Verificar si el empleado con el ID dado existe en la base de datos
      const productoExistente = await Producto.findById(productoId);
      if (!productoExistente) {
        return res.status(404).send({ message: "Producto no encontrado." });
      }
  
      // Eliminar la foto antigua si se proporciona una nueva
      if (req.files && req.files.portada) {
        // Eliminar la foto antigua si existe
        if (productoExistente.portada) {
          const rutaFotoAntigua = `./uploads/productos/${productoExistente.portada}`;
          if (fs.existsSync(rutaFotoAntigua)) {
            fs.unlinkSync(rutaFotoAntigua);
          }
        }
  
        // Guardar la nueva foto
        var img_path = req.files.portada.path;
        var name = img_path.split("\\");
        var portada_name = name[2];
        productoExistente.portada = portada_name;
      }
  
      // Actualizar los campos del empleado con los nuevos datos
      productoExistente.codigo = data.codigo;
      productoExistente.titulo = data.titulo;
      productoExistente.precio_venta = data.precio_venta;
      productoExistente.presentacion = data.presentacion;
      productoExistente.idcategoria = data.idcategoria;
      productoExistente.idmarca = data.idmarca;
      productoExistente.contenido = data.contenido;
      productoExistente.descripcion = data.descripcion;

      try {
        // Guardar los cambios en la base de datos
        await productoExistente.save();
  
        // Envía una respuesta con el empleado actualizado
        res.status(200).send({ data: productoExistente });
      } catch (error) {
        // Si hay un error al guardar los cambios, envía un mensaje de error
        res.status(500).send({ message: "Error al actualizar el producto." });
      }
    } else {
      res
        .status(403)
        .send({ message: "No tiene acceso para actualizar el producto." });
    }
  };


//Eliminar producto
const eliminar_producto_admin = async function (req, res) {
    try {
      if (req.user && req.user.rol === "ADMIN") {
        var id = req.params["id"];
  
        // Obtener el empleado de la base de datos
        const producto = await Producto.findById(id);
  
        // Verificar si el empleado existe en la base de datos
        if (!producto) {
          return res.status(404).send({ message: "Producto no encontrado." });
        }
  
        // Verificar si el empleado tiene una foto
        if (producto.portada) {
          // Construir la ruta completa del archivo de la foto
          const rutaPortada = `./uploads/productos/${producto.portada}`;
          console.log(rutaPortada);
          // Verificar si el archivo de la foto existe en el sistema de archivos antes de intentar eliminarlo
          if (fs.existsSync(rutaPortada)) {
            // Eliminar la fotografía del sistema de archivos
            fs.unlinkSync(rutaPortada);
          }
        }
  
        // Eliminar el empleado de la base de datos
        const reg = await Producto.findByIdAndRemove({ _id: id });
  
        // Enviar la respuesta
        res.status(200).send({ data: reg });
      } else {
        res
          .status(403)
          .send({ message: "No tiene acceso para eliminar el producto." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al eliminar el producto." });
    }
  };


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