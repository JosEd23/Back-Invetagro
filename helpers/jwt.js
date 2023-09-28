'use strict'    

//variables para decodificar tokens

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'jose';

exports.createtoken = function(user){
    var payload = {
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        correo: user.correo,
        rol: user.rol,
        iat: moment().unix(),   
        exp: moment().add(7,'days').unix()
    }

    return jwt.encode(payload,secret);
} 