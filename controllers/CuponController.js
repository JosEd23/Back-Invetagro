var cupon = require('../models/cupon');

//Registro de cupon
const registro_cupon_admin = async function(req, res){
    if(req.user){
        if(req.user.rol == 'ADMIN'){

            let data = req.body;

            let reg = await cupon.create(data);
            res.status(200).send({data:reg});
        }else{
            res.status(500).send({message:'Sin acceso'})
        }
    }else{
        res.status(500).send({message:'Sin acceso'})
    }

}

//Listar cupones
const listar_cupones_admin = async function (req, res){
    if(req.user){
        if(req.user.rol == 'ADMIN'){
            
            var filtro = req.params['filtro'];
            
            let reg = await cupon.find({codigo: new RegExp(filtro, 'i')});
            res.status(200).send({data: reg});
        }else{
            res.status(500).send({message: 'No tienes acceso'});
        }
    }else{
        res.status(500).send({message: 'No tienes acceso' });
    }
}

module.exports = {
    registro_cupon_admin,
    listar_cupones_admin 
}