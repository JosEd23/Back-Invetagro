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


//Eliminar marca
const eliminar_marca_admin = async function(req, res){
    if(req.user){
        if(req.user.rol == 'ADMIN'){

            var id = req.params['id']

            // // Primero, verifica si la marca está asignada a algún producto
            // const marcaAsignada = await producto.findOne({ marca: id });

            // if (marcaAsignada) {
            //     // Si la marca está asignada a un producto, no la elimines y devuelve un mensaje de error
            //     res.status(400).send({ message: 'La marca está asignada a un producto y no puede eliminarse.' });
            // } else {
            //     // Si la marca no está asignada a ningún producto, elimínala
            // }
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
