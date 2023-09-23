'use strict'

//variables
var Admin = require('../models/admin');
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


module.exports = {
    registro_admin,
    login_admin
}