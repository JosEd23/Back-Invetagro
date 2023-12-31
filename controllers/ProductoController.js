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
      var name = img_path.split("/");
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
const obtener_portada = async function (req, res) {
  var img = req.params['img'];

  fs.stat('./uploads/productos/' + img, function (err) {
    if (!err) {
      let path_img = './uploads/productos/' + img;
      res.status(200).sendFile(path.resolve(path_img));
    } else {
      let path_img = './uploads/default.png';
      res.status(200).sendFile(path.resolve(path_img));
    }
  });
}

//Metodo para obtener producto para actualizarlo
const obtener_producto_admin = async function (req, res) {
  if (req.user) {
    if (req.user.rol == 'ADMIN') {

      var id = req.params['id'];

      try {
        var reg = await Producto.findById({ _id: id });
        res.status(200).send({ data: reg });

      } catch (error) {
        res.status(200).send({ data: undefined });
      }


    } else {
      res.status(500).send({ message: 'No access' });
    }
  } else {
    res.status(500).send({ message: 'No access' });
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
      var name = img_path.split("/");
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
      .send({ message: "No tiene acceso para actualizar el producto." });
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
    res.status(500).send({ message: "Error al eliminar el producto." });
  }
};

//----------------------------------------->Metodos Pubicos<---------------------

const listar_productos_publico = async function (req, res) {
  var filtro = req.params['filtro'];

  let reg = await Producto.find({ titulo: new RegExp(filtro, 'i')}).sort({createdAt:-1});
    

  res.status(200).send({ data: reg });
}

const obtener_productos_slug_publico = async function (req, res) {
  var slug = req.params['slug'];
  let reg = await Producto.findOne({ slug: slug })

  res.status(200).send({ data: reg });
}


const listar_productos_recomendados_publico = async function (req, res) {
  try {
    var idcategoria = req.params['idcategoria'];
    let reg = await Producto.find({ idcategoria: idcategoria }).sort({ createdAt: -1 }).limit(8);
    res.status(200).send({ data: reg });
  } catch (error) {
    // Manejo de errores
    console.error("Ha ocurrido un error: ", error);
    res.status(500).send({ error: "Ha ocurrido un error al obtener los productos recomendados." });
  }
};

const listar_productos_nuevos_publico = async function (req, res) {
  let reg = await Producto.find().sort({createdAt:-1}).limit(8);
  res.status(200).send({ data: reg });
}

const listar_productos_masvendidos_publico = async function (req, res) {
  let reg = await Producto.find().sort({nventas:-1}).limit(8);
  res.status(200).send({ data: reg });
}



module.exports = {
  registro_producto_admin,
  listar_productos_admin,
  obtener_portada,
  obtener_producto_admin,
  actualizar_producto_admin,
  eliminar_producto_admin,
  listar_productos_publico,
  obtener_productos_slug_publico,
  listar_productos_recomendados_publico,
  listar_productos_nuevos_publico,
  listar_productos_masvendidos_publico
}