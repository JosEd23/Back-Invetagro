var marca = require ('../models/marca');
var producto = require ('../models/producto');

//Registro de marca
const registro_marca_admin = async function (req, res){
    if(req.user){
        if(req.user.rol == 'ADMIN'){

            let data = req.body;

            let reg = await marca.create(data);
            res.status(200).send({data:reg});
        }else{
            res.status(500).send({message:'Sin acceso'})
        }
    }else{
        res.status(500).send({message:'Sin acceso'})
    }

}
    
//Listar marca
const listar_marca_filtro_admin = async function(req, res) {
    if (req.user) {
        if (req.user.rol == 'ADMIN') {
            let filtro = req.params['filtro'];

            if (filtro == null || filtro === 'null') {
                let reg = await marca.find();
                res.status(200).send({ data: reg });
            } else {
                // Filtro
                let reg = await marca.find({
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
const obtener_marca_admin = async function (req, res){
    if(req.user){
        if(req.user.rol == 'ADMIN'){

            var id = req.params['id'];
            
            try {
                var reg = await marca.findById({_id:id});
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

const actualizar_marca_admin = async function(req, res){
    if(req.user){
        if(req.user.rol == 'ADMIN'){

            var id = req.params['id'];
            var data = req.body;

            var reg = await marca.findByIdAndUpdate({_id:id},{
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


const eliminar_marca_admin = async function(req, res) {
    if (req.user && req.user.rol === 'ADMIN') {
      var id = req.params['id'];
  
      try {
        // Verifica si la marca no esta siendo utilizada por algun producto
        const marcaProducto = await producto.findOne({ idmarca: id });
  
        if (marcaProducto) {
          res.status(400).send({ message: 'La Marca esta siendo utilizada en la coleccion de productos. No se puede eliminar.' });
        } else {
          // Si la marca no esta siendo utilizada, eliminarla
          let reg = await marca.findByIdAndRemove({ _id: id });
  
          if (reg) {
            res.status(200).send({ data: reg });
          } else {
            res.status(404).send({ message: 'Marca no encontrado.' });
          }
        }
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al eliminar marca.' });
      }
    } else {
      res.status(403).send({ message: 'No tiene acceso para eliminar la marca.' });
    }
  };


module.exports = {
    registro_marca_admin,
    listar_marca_filtro_admin,
    obtener_marca_admin,
    actualizar_marca_admin,
    eliminar_marca_admin
}
