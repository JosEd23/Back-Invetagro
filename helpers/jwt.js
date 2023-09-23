'use strict'    

//variables para decodificar tokens

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'drd85739';

exports.createtoken = function(user){
    var payload = {
        sub: user._id,
        nombres: user.nombres,
        apellido: user.apellido,
        correo: user.correo,
        rol: user.rol,
        iat: moment().unix(),   
        exp: moment().add(7,'days').unix()
    }

    return jwt.encode(payload,secret);
} 