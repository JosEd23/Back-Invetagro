    var Proveedor = require('../models/proveedor');

    function listar(req,res){
        console.log('hola1');
        var nombres = req.params['nombres'];
        Proveedor.find({nombres: new RegExp(nombres,'i')}).exec((err,
            proveedor_listado)=>{
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
            if(proveedor_listado){
                res.status(200).send({proveedor: proveedor_listado});
            }else{
                res.status(403).send({message: 'No hay proveedores en la bd'});
            }
        }
        });
    }

    function obtener(req,res){
        var id = req.params['id'];

        Proveedor.findById(id,(err,data)=>{
            if(data){
                res.status(200).send({proveedor:data});
            }
        })
    }


    function registrar(req,res){
        console.log('hola3');
        let data = req.body;
        var proveedor = new Proveedor();
        proveedor.nombres = data.nombres;
        proveedor.telefono = data.telefono;
        proveedor.vendedor = data.vendedor;
        proveedor.direccion = data.direccion;

    

        proveedor.save((err,proveedor_save)=>{
            if(proveedor_save){
                res.status(200).send({proveedor: proveedor_save});
            }else{
                res.status(500).send(err);
            }
        });

    }

    function editar(req,res){
        let id = req.params['id'];
        let data = req.body;

        Proveedor.findOneAndUpdate(id,{nombres: data.nombres,  direccion: data.direccion, vendedor: data.vendedor, telefono: data.telefono}, (err,proveedor_edit)=>{
            if(proveedor_edit){
                res.status(200).send({proveedor: proveedor_edit});
            }else{
                res.status(500).send(err);
            }
        })
    }

    function eliminar(req,res){
        let id = req.params['id'];

        Proveedor.findByIdAndRemove(id,(err,proveedor_delete)=>{
            if(proveedor_delete){
                res.status(200).send({proveedor:proveedor_delete});
            }else{
                res.status(500).send(err);
            }
        })
    }

    module.exports = {
        registrar,
        editar,
        eliminar,
        listar,
    obtener
    }