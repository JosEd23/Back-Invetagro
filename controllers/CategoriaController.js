var categoria = require('../models/categoria');

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
const listar_categoria_admin = async function(req, res){
    if(req.user){
        if(req.user.rol == 'ADMIN'){
            
            var filtro = req.params['filtro'];
            
            let reg = await categoria.find({codigo: new RegExp(filtro, 'i')});
            res.status(200).send({data: reg});
        }else{
            res.status(500).send({message: 'No tienes acceso'});
        }
    }else{
        res.status(500).send({message: 'No tienes acceso' });
    }
}

//Eliminar categorias
const eliminar_categoria_admin = async function(req, res){
    if(req.user){
        if(req.user.rol == 'ADMIN'){

            var id = req.params['id']

            let reg=await categoria.findByIdAndRemove({_id:id});
            res.status(200).send({data:reg});
            
           
        }else{
            res.status(500).send({message:'No access'});
        }
    }else{
        res.status(500).send({message:'No access'});
    }
}

module.exports = {
    registro_categoria_admin,
    listar_categoria_admin,
    eliminar_categoria_admin
}
// //Funcion para registrar categoria
// function registrar(req,res){
//     var data = req.body;
//     var categoria = new Categoria();
//     categoria.titulo = data.titulo;
//     Categoria.find({titulo: new RegExp(categoria.titulo,'i')}, (err,categoria_listado)=>{
//         if(err){
//             res.status(500).send({message: err});
//         }else{
//         console.log(categoria_listado);   
//         if(categoria_listado.length > 0){
//             res.status(200).send({message: 'Ya existe esta Categoria en la Base de datos', status: '01'});
//         }else{
//         categoria.save((err,categoria_save)=>{
//         if(err){
//             console.log(err);
//             console.log('Operacion Mala')
//             res.status(500).send({message: 'Error en el servidor'});
//         }else{
//             if(categoria_save){
//                 res.status(200).send({categoria: categoria_save, status : '200'});
//             }else{
//                 res.status(403).send({message: 'La categoria no se pudo registrar'});
//             }
//         }
     
//     });
// }
// }
// });
// }

// //Funcion para obtener categoria
// function obtener_categoria(req,res){
//     var id = req.params['id'];
    
//     Categoria.findById({_id: id}, (err,categoria_data) =>{
//         if(err){
//             res.status(500).send({message: 'Error en el servidor'});
//         }else{
//             if(categoria_data){
//                 res.status(200).send({categoria: categoria_data});
//             }else{
//                 res.status(403).send({message: 'La categoria no existe'});
//             }
//         }
//     });
    
// }

// //Funcion para editar categoria

// function editar(req,res){
//     var id = req.params['id'];
//     var data = req.body;

//     Categoria.findByIdAndUpdate({_id:id},{titulo: data.titulo},(err,categoria_edit)=>{
//         if(err){
//             res.status(500).send({message: 'Error en el servidor'});
//         }else{
//            if(categoria_edit){
//             res.status(200).send({categoria: categoria_edit});
//            }else{
//             res.status(403).send({message: 'La categoria no se pudo actualizar'});
//            }
//         }
//     });
// }

// //Funcion para eliminar categoria
// function eliminar(req,res)
// {
//     var id = req.params['id'];

//     Categoria.findByIdAndRemove({_id:id},(err,categoria_delete)=>{
//         if(err){
//             res.status(500).send({message: 'Error en el servidor'});
//         }else{
//             if(categoria_delete){
//                 res.status(200).send({categoria: categoria_delete});
//             }else{
//                 res.status(403).send({message: 'La categoria no se pudo eliminar'}); 
//             }
//         }
//     });
// }

// //Funcion para listar categoria

// function listar(req,res){
//     var nombre = req.params['nombre'];

    

//     Categoria.find({titulo: new RegExp(nombre,'i')}, (err,categoria_listado)=>{
//         if(err){
//             res.status(500).send({message: err});
//         }else{
//             if(categoria_listado){
//                 res.status(200).send({categorias: categoria_listado});
//             }else{
//                 res.status(403).send({message: 'No hay registros con ese titulo'}); 
//             }
//         }
//     });

// }

// //

// module.exports = {
//     registrar,
//     obtener_categoria,
//     editar,
//     eliminar,
//     listar
// }