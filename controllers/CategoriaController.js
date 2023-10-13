var categoria = require('../models/categoria');
var producto = require('../models/producto');

//Registro de categoria
const registro_categoria_admin = async function(req, res){
    if(req.user){
        if(req.user.rol == 'ADMIN'){

            let data = req.body;

            let reg = await categoria.create(data);
            res.status(200).send({data:reg});
        }else{
            res.status(500).send({message:'Sin acceso'})
        }
    }else{
        res.status(500).send({message:'Sin acceso'})
    }
}

//Listar categorias
const listar_categoria_filtro_admin = async function(req, res){
    if (req.user) {
        if (req.user.rol == 'ADMIN') {
            let filtro = req.params['filtro'];

            if (filtro == null || filtro === 'null') {
                let reg = await categoria.find();
                res.status(200).send({ data: reg });
            } else {
                // Filtro
                let reg = await categoria.find({
                    $or: [
                        { nombres: new RegExp(filtro, 'i') },
                    ]
                });
                res.status(200).send({ data: reg });
            }
        } else {
            res.status(500).send({ message: 'NoAcces' });
        }
    } else {
        res.status(500).send({ message: 'NoAcces' });
    }
}


//Obtener marca para editar o eliminar
const obtener_categoria_admin = async function (req, res){
    if(req.user){
        if(req.user.rol == 'ADMIN'){

            var id = req.params['id'];
            
            try {
                var reg = await categoria.findById({_id:id});
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

//Actualizar categoria
const actualizar_categoria_admin = async function(req, res){
    if(req.user){
        if(req.user.rol == 'ADMIN'){

            var id = req.params['id'];
            var data = req.body;

            var reg = await categoria.findByIdAndUpdate({_id:id},{
                titulo: data.titulo,
                
            })
            res.status(200).send({data:reg});

        }else{
            res.status(500).send({message:'No access'});
        }
    }else{
        res.status(500).send({message:'No access'});
    }
}

const eliminar_categoria_admin = async function(req, res) {
    if (req.user && req.user.rol === 'ADMIN') {
      var id = req.params['id'];
  
      try {
        // Verificar si la categoria esta siendo utlizada en productos
        const categoriaProducto = await producto.findOne({ idcategoria: id });
  
        if (categoriaProducto) {
          res.status(400).send({ message: 'La Categoria esta siendo utilizada en la coleccion de productos. No se puede eliminar.' });
        } else {
          // Si la categoria no está siendo utilizada, eliminarlo
          let reg = await categoria.findByIdAndRemove({ _id: id });
  
          if (reg) {
            res.status(200).send({ data: reg });
          } else {
            res.status(404).send({ message: 'Categoria no encontrada.' });
          }
        }
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al eliminar categoria.' });
      }
    } else {
      res.status(403).send({ message: 'No tiene acceso para eliminar la categoria.' });
    }
  };


module.exports = {
    registro_categoria_admin,
    listar_categoria_filtro_admin,
    obtener_categoria_admin,
    actualizar_categoria_admin,
    eliminar_categoria_admin
}