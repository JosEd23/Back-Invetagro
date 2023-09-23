'use strict'
//variables del sistema

const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

var port = process.env.PORT || 4201;

//Variable para rutas
var cliente_route = require('./routes/cliente');
var admin_route = require('./routes/admin');
var proveedor_route = require('./routes/proveedor');
var categoria_route = require('./routes/categoria');
var cupon_route = require('./routes/cupon');

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
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.listen(port, () =>{
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

databese();

module.exports = app;