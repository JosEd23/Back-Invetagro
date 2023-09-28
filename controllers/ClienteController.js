'use strict'

const cliente = require('../models/cliente');
//variables
var Cliente = require('../models/cliente');
var bcrypt = require('bcrypt-nodejs');
var jwt =require('../helpers/jwt');


//funciones de controlador

const registro_cliete = async function(req, res){
    var data = req.body;
    var cliente_ar = [];

    cliente_ar = await Cliente.find({correo:data.correo});
    //validacion de que este registrado
    if (cliente_ar.length == 0) {
        
        if (data.password) {
            bcrypt.hash(data.password,null,null, async function(err,hash){

                if (hash) {
                    data.password = hash;
                    var reg = await Cliente.create(data);
                    res.status(200).send({data:reg});
                }else{
                    res.status(200).send({message:'ErrorServer', data: undefined});
                }
            })
        }else{
            res.status(200).send({message:'No hay una contraseña', data: undefined});
        }
        
   
    }else{
        res.status(200).send({message:'el correro ya existe', data: undefined});
    }
}       

//Funcion login
const login_cliente =async function(req, res){
    var data = req.body;
    var cliente_ar = [];
    cliente_ar = await Cliente.find({correo: data.correo});
    if (cliente_ar.length==0) {
        res.status(200).send({message: 'No se encontro el correo', data: undefined});
    }else{
        let user = cliente_ar[0];
//metodo para comprarar contraseñas
        bcrypt.compare(data.password, user.password, async function(error, check){
            if (check) {
                res.status(200).send({data:user,
                    token: jwt.createtoken(user)   
                });
            }else{
                res.status(200).send({message: 'La contraseña no coincide', data: undefined});
            }
        });
       // 

    }

    
}

//Funcion para listar clientes
// const listar_clientes_filtro_admin = async function(req, res){
//    console.log(req.user);
//    if(req.user){
//         if(req.user.rol == 'ADMIN'){
//             let tipo = req.params['tipo'];
//             let filtro = req.params['filtro'];
        
//             console.log(tipo);
        
//             if(tipo == null || tipo == 'null'){     
//                 let reg = await Cliente.find();
//                 res.status(200).send({data:reg});
//             }else{
//                 //Filtro
//                 if(tipo == 'nombres'){
//                     let reg = await Cliente.find({nombres:new RegExp(filtro,'i')});
//                     res.status(200).send({data:reg});
//                 }else if(tipo == 'correo'){
//                     let reg = await Cliente.find({correo:new RegExp(filtro,'i')});
//                     res.status(200).send({data:reg});
//                 }
//             }
//         }else{
//             res.status(500).send({message: 'NoAcces'});
//         }
//    }else{
//     res.status(500).send({message: 'NoAcces'});
//    }
// }

const listar_clientes_filtro_admin = async function(req, res) {
    if (req.user) {
        if (req.user.rol == 'ADMIN') {
            let filtro = req.params['filtro'];

            if (filtro == null || filtro === 'null') {
                let reg = await Cliente.find();
                res.status(200).send({ data: reg });
            } else {
                // Filtro
                let reg = await Cliente.find({
                    $or: [
                        { nombres: new RegExp(filtro, 'i') },
                        { correo: new RegExp(filtro, 'i') }
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

const registro_cliente_admin = async function(req, res){
    if(req.user){
        if(req.user.rol == 'ADMIN'){
            var data = req.body;

            bcrypt.hash('123456789', null,null,async function(err,hash){
                if(hash){
                    data.password = hash;
                    let reg = await Cliente.create(data);
                    res.status(200).send({data:reg});
                }else{
                    res.status(200).send({message:'Error en el servidor', data: undefined});
                }
            })    
        }else{
            res.status(500).send({message:'No access'});
        }
    }else{
        res.status(500).send({message:'No access'});
    }
}

const obtener_cliente_admin = async function (req, res){
    if(req.user){
        if(req.user.rol == 'ADMIN'){

            var id = req.params['id'];
            
            try {
                var reg = await Cliente.findById({_id:id});
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

const actualizar_cliente_admin = async function(req, res){
    if(req.user){
        if(req.user.rol == 'ADMIN'){

            var id = req.params['id'];
            var data = req.body;

            var reg = await Cliente.findByIdAndUpdate({_id:id},{
                nombres: data.nombres,
                apellidos: data.apellidos,
                departamento:data.departamento,
                municipio: data.municipio,
                direccion : data.direccion,
                correo : data.correo,
                password : data.password,
                telefono : data.telefono,
                nacimiento : data.nacimiento,
                dpi : data.dpi
            })
            res.status(200).send({data:reg});

        }else{
            res.status(500).send({message:'No access'});
        }
    }else{
        res.status(500).send({message:'No access'});
    }
}

const eliminar_cliente_admin = async function(req, res){
    if(req.user){
        if(req.user.rol == 'ADMIN'){

            var id = req.params['id']

            let reg=await Cliente.findByIdAndRemove({_id:id});
            res.status(200).send({data:reg});
            
           
        }else{
            res.status(500).send({message:'No access'});
        }
    }else{
        res.status(500).send({message:'No access'});
    }
}


module.exports = {
    registro_cliete,
    login_cliente,
    listar_clientes_filtro_admin,
    registro_cliente_admin,
    obtener_cliente_admin,
    actualizar_cliente_admin,
    eliminar_cliente_admin
}