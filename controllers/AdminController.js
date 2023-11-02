'use strict'

//variables
var Venta = require('../models/venta');
var Detalleventa = require('../models/detalleventa');


var Admin = require('../models/admin');
var Contacto = require('../models/contacto');
var bcrypt = require('bcrypt-nodejs');
var jwt =require('../helpers/jwt');

const registro_admin = async function(req, res){
    var data = req.body;
    var admin_ar = [];

    admin_ar = await Admin.find({correo:data.correo});
    //validacion de que este registrado
    if (admin_ar.length == 0) {
        
        if (data.password) {
            bcrypt.hash(data.password,null,null, async function(err,hash){

                if (hash) {
                    data.password = hash;
                    var reg = await Admin.create(data);
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

const login_admin =async function(req, res){
    var data = req.body;
    var admin_ar = [];
    admin_ar = await Admin.find({correo: data.correo});
    if (admin_ar.length==0) {
        res.status(200).send({message: 'No se encontro el correo correspondiente', data: undefined});
    }else{
        let user = admin_ar[0];
//metodo para comprarar contraseñas
        bcrypt.compare(data.password, user.password, async function(error, check){
            if (check) {
                res.status(200).send({data:user,
                token: jwt.createtoken(user)    
                });
            }else{
                res.status(200).send({message: 'La contraseña no coincide con el correo escrito', data: undefined});
            }
        });
       // 

    }

}

//--------------LISTAR MENSAJES -----------------------
const obtener_mensaje_admin = async function (req, res){
    if(req.user){
        if(req.user.rol == 'ADMIN'){

            try {
                
                let reg = await Contacto.find().sort({createdAt:-1});
                res.status(200).send({data:reg});
                
            } catch (error) {
                res.status(200).send({data:undefined});
            }
        }else{
            res.status(500).send({message:'Error en el servidor'});
        }
    }else{
        res.status(500).send({message:'Error'});
    }
}

const cerrar_mensaje_admin = async function (req, res){
    if(req.user){
        if(req.user.rol == 'ADMIN'){

            try {

                let id = req.params['id'];

                let reg = await Contacto.findByIdAndUpdate({_id:id});
                res.status(200).send({data:reg});
                
            } catch (error) {
                res.status(200).send({data:undefined});
            }
        }else{
            res.status(500).send({message:'Error en el servidor'});
        }
    }else{
        res.status(500).send({message:'Error'});
    }
}


//----------------------------> Ventas

const obtener_ventas_admin = async function (req, res){
    if(req.user){
        if(req.user.rol == 'ADMIN'){

            let ventas = [];
           let desde = req.params['desde'];
            let hasta = req.params['hasta'];

            if(desde == 'undefined' && hasta == 'undefined'){
                ventas = await Venta.find()
                .populate('idcliente')
                .populate('direccion').sort({createdAt:-1});
                 res.status(200).send({data:ventas});

                // console.log('No hay filtros')
                }else{
                // console.log('Si hay filtros')
                let tt_desde = Date.parse(new Date(desde + 'T00:00:00'))/1000;
                let tt_hasta = Date.parse(new Date(hasta + 'T00:00:00'))/1000;

                // console.log(tt_desde + '-' + tt_hasta);
                let tem_ventas = await Venta.find()
                .populate('idcliente')
                .populate('direccion').sort({createdAt:-1});
                 res.status(200).send({data:ventas});

                for(var item of tem_ventas){
                    var tt_created = Date.parse(new Date(item.createdAt))/1000;
                    if(tt_created >= tt_desde && tt_created <= tt_hasta){
                        ventas.push(item);
                    }
                }
                res.status(200).send({data:ventas});

            }
          
          

        }else{
            res.status(500).send({message:'Error en el servidor'});
        }
    }else{
        res.status(500).send({message:'Error'});
    }
}


module.exports = {
    registro_admin,
    login_admin,
    obtener_mensaje_admin,
    cerrar_mensaje_admin,
    obtener_ventas_admin
}