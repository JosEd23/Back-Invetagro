'use strict'

const cors = require('cors');

//variables del sistema

const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

var port = process.env.PORT || 4201;

//Utilizando Socket.io
var server = require('http').createServer(app);
var io = require('socket.io')(server,{
    cors: {origin : '*'}
});
//Inicializando socket
io.on('connection',function(socket){
    //Socket para eliminar
    socket.on('delete-carrito',function(data){
        io.emit('new-carrito',data);
        // console.log(data);
    });
    //Socket para agregar
    socket.on('add-carrito-add',function(data){
        io.emit('new-carrito-add',data);
        // console.log(data);
    });
});

//Variable para rutas
var cliente_route = require('./routes/cliente');
var admin_route = require('./routes/admin');
var proveedor_route = require('./routes/proveedor');
var categoria_route = require('./routes/categoria');
var cupon_route = require('./routes/cupon');
var marca_route = require('./routes/marca');
var producto_route = require('./routes/producto');
var carrito_route = require('./routes/carrito');

//conexion a base de datos
const databese = module.exports = () =>{
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedToplogy: true,
    }
    try {
        mongoose.connect('mongodb+srv://admin:C6lDD3mBuwdMEImn@cluster0.00fs89q.mongodb.net/?retryWrites=true&w=majority');
        console.log('Base datos conectada');
    } catch (error) {
        console.log(error);
        console.log('Base datos no conectada');
    }
}

//permite la conexion entre back y front
// app.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin','*'); 
//     res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
//     res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
//     res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
//     next();
// });
app.use(cors());


server.listen(port, () =>{
    console.log('server corriendo en el puerto '+ port);
});

//metodo para parsear data de fronted a backend
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json({limit: '50mb' ,extended:true}));


app.use('/api',cliente_route);
app.use('/api',admin_route);
app.use('/api',proveedor_route);
app.use('/api',categoria_route);
app.use('/api',cupon_route);
app.use('/api',marca_route);
app.use('/api',producto_route);
app.use('/api',carrito_route);

databese();

module.exports = app;