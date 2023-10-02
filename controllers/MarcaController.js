var marca = require ('../models/marca');

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
                marca: data.marca,
                
            })
            res.status(200).send({data:reg});

        }else{
            res.status(500).send({message:'No access'});
        }
    }else{
        res.status(500).send({message:'No access'});
    }
}


//Eliminar marca
const eliminar_marca_admin = async function(req, res){
    if(req.user){
        if(req.user.rol == 'ADMIN'){

            var id = req.params['id']

            let reg=await marca.findByIdAndRemove({_id:id});
            res.status(200).send({data:reg});
            
           
        }else{
            res.status(500).send({message:'No access'});
        }
    }else{
        res.status(500).send({message:'No access'});
    }
}



module.exports = {
    registro_marca_admin,
    listar_marca_filtro_admin,
    obtener_marca_admin,
    actualizar_marca_admin,
    eliminar_marca_admin
}

// var Marca = require('../models/marca');

// function registrar(req,res){
//     var data = req.body;

//     var marca = new Marca();
//     marca.titulo = data.titulo;
//     Marca.find({titulo: new RegExp(marca.titulo,'i')}, (err,marca_listado)=>{
//         if(err){
//             res.status(500).send({message: err});
//         }else{
//             console.log(marca_listado);
//             if(marca_listado.length > 0){
//                 res.status(200).send({message: 'Ya existe esta Marca en la Base de Datos', status : '01'}); 
//             }else{
//                 marca.save((err,marca_save)=>{
//                     if(err){
//                         console.log(err);
//                         console.log('Operacion Mala');
//                         res.status(500).send({message: 'Error en el servidor'});
//                     }else{
//                         if(marca_save){
//                             res.status(200).send({marca: marca_save, status : '00'});
//                         }else{
//                             res.status(403).send({message: 'La marca no se pudo registrar'});
//                         }
//                     }
//                 });
//             }
//         }
//     });
   
// }

// function obtener_marca(req,res){
//     var id = req.params['id'];
    
//     Marca.findById({_id: id}, (err,marca_data) =>{
//         if(err){
//             res.status(500).send({message: 'Error en el servidor'});
//         }else{
//             if(marca_data){
//                 res.status(200).send({marca: marca_data});
//             }else{
//                 res.status(403).send({message: 'La marca no existe'});
//             }
//         }
//     });
    
// }

// function editar(req,res){
//     var id = req.params['id'];
//     var data = req.body;

//     Marca.findByIdAndUpdate({_id:id},{titulo: data.titulo},(err,marca_edit)=>{
//         if(err){
//             res.status(500).send({message: 'Error en el servidor'});
//         }else{
//            if(marca_edit){
//             res.status(200).send({marca: marca_edit});
//            }else{
//             res.status(403).send({message: 'La marca no se pudo actualizar'});
//            }
//         }
//     });
// }

// function eliminar(req,res)
// {
//     var id = req.params['id'];

//     Marca.findByIdAndRemove({_id:id},(err,marca_delete)=>{
//         if(err){
//             res.status(500).send({message: 'Error en el servidor'});
//         }else{
//             if(marca_delete){
//                 res.status(200).send({marca: marca_delete});
//             }else{
//                 res.status(403).send({message: 'La marca no se pudo eliminar'}); 
//             }
//         }
//     });
// }

// function listar(req,res){
//     var nombre = req.params['nombre'];

    

//     Marca.find({titulo: new RegExp(nombre,'i')}, (err,marca_listado)=>{
//         if(err){
//             res.status(500).send({message: err});
//         }else{
//             if(marca_listado){
//                 res.status(200).send({marca: marca_listado});
//             }else{
//                 res.status(403).send({message: 'No hay registros con ese titulo'}); 
//             }
//         }
//     });

// }

// module.exports = {
//     registrar,
//     obtener_marca,
//     editar,
//     eliminar,
//     listar
// }