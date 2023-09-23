var Categoria = require('../models/categoria');

//Funcion para registrar categoria
function registrar(req,res){
    var data = req.body;
    var categoria = new Categoria();
    categoria.titulo = data.titulo;
    Categoria.find({titulo: new RegExp(categoria.titulo,'i')}, (err,categoria_listado)=>{
        if(err){
            res.status(500).send({message: err});
        }else{
        console.log(categoria_listado);   
        if(categoria_listado.length > 0){
            res.status(200).send({message: 'Ya existe esta Categoria en la Base de datos', status: '01'});
        }else{
        categoria.save((err,categoria_save)=>{
        if(err){
            console.log(err);
            console.log('Operacion Mala')
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(categoria_save){
                res.status(200).send({categoria: categoria_save, status : '200'});
            }else{
                res.status(403).send({message: 'La categoria no se pudo registrar'});
            }
        }
     
    });
}
}
});
}

//Funcion para obtener categoria
function obtener_categoria(req,res){
    var id = req.params['id'];
    
    Categoria.findById({_id: id}, (err,categoria_data) =>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(categoria_data){
                res.status(200).send({categoria: categoria_data});
            }else{
                res.status(403).send({message: 'La categoria no existe'});
            }
        }
    });
    
}

//Funcion para editar categoria

function editar(req,res){
    var id = req.params['id'];
    var data = req.body;

    Categoria.findByIdAndUpdate({_id:id},{titulo: data.titulo},(err,categoria_edit)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
           if(categoria_edit){
            res.status(200).send({categoria: categoria_edit});
           }else{
            res.status(403).send({message: 'La categoria no se pudo actualizar'});
           }
        }
    });
}

//Funcion para eliminar categoria
function eliminar(req,res)
{
    var id = req.params['id'];

    Categoria.findByIdAndRemove({_id:id},(err,categoria_delete)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(categoria_delete){
                res.status(200).send({categoria: categoria_delete});
            }else{
                res.status(403).send({message: 'La categoria no se pudo eliminar'}); 
            }
        }
    });
}

//Funcion para listar categoria

function listar(req,res){
    var nombre = req.params['nombre'];

    

    Categoria.find({titulo: new RegExp(nombre,'i')}, (err,categoria_listado)=>{
        if(err){
            res.status(500).send({message: err});
        }else{
            if(categoria_listado){
                res.status(200).send({categorias: categoria_listado});
            }else{
                res.status(403).send({message: 'No hay registros con ese titulo'}); 
            }
        }
    });

}

//

module.exports = {
    registrar,
    obtener_categoria,
    editar,
    eliminar,
    listar
}