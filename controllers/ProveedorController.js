var proveedor = require('../models/proveedor');

//Registro de proveedor
const registro_proveedor_admin = async function(req, res){
    if(req.user){
        if(req.user.rol == 'ADMIN'){

            let data = req.body;

            let reg = await proveedor.create(data);
            res.status(200).send({data:reg});
        }else{
            res.status(500).send({message:'Sin acceso'})
        }
    }else{
        res.status(500).send({message:'Sin acceso'})
    }

}

//Listar proveedores
const listar_proveedor_filtro_admin = async function(req, res) {
    if (req.user) {
        if (req.user.rol == 'ADMIN') {
            let filtro = req.params['filtro'];

            if (filtro == null || filtro === 'null') {
                let reg = await proveedor.find();
                res.status(200).send({ data: reg });
            } else {
                // Filtro
                let reg = await proveedor.find({
                    $or: [
                        { nombres: new RegExp(filtro, 'i') },
                        { nit: new RegExp(filtro, 'i') }
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

const obtener_proveedor_admin = async function (req, res){
    if(req.user){
        if(req.user.rol == 'ADMIN'){

            var id = req.params['id'];
            
            try {
                var reg = await proveedor.findById({_id:id});
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

const actualizar_proveedor_admin = async function(req, res){
    if(req.user){
        if(req.user.rol == 'ADMIN'){

            var id = req.params['id'];
            var data = req.body;

            var reg = await proveedor.findByIdAndUpdate({_id:id},{
                nombres: data.nombres,
                nit: data.nit,
                telefono:data.telefono,
                vendedor: data.vendedor,
                direccion : data.direccion,
            })
            res.status(200).send({data:reg});

        }else{
            res.status(500).send({message:'No access'});
        }
    }else{
        res.status(500).send({message:'No access'});
    }
}

const eliminar_proveedor_admin = async function(req, res){
    if(req.user){
        if(req.user.rol == 'ADMIN'){

            var id = req.params['id']

            let reg=await proveedor.findByIdAndRemove({_id:id});
            res.status(200).send({data:reg});
            
           
        }else{
            res.status(500).send({message:'No access'});
        }
    }else{
        res.status(500).send({message:'No access'});
    }
}

module.exports = {
    registro_proveedor_admin,
    listar_proveedor_filtro_admin,
    obtener_proveedor_admin,
    actualizar_proveedor_admin,
    eliminar_proveedor_admin
}
