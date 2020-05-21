//Importar servicio de postgres
const ServicioPG = require('../services/pg')
const jwt = require('jsonwebtoken')

const secret_key = process.env.SECRET_KEY;

/**
 * Validar informacion que se quiere insertar
 * @param {*} info 
 */

let validarLogin = info => {
    if(!info.correo || !info.clave){
        throw {
            ok:false, 
            mensaje:"Todos los campos son obligatorios"
        };
    }
}

let consultarUsuario = async info => {
    let servicio = new ServicioPG()
    let sql = `select * from acc_usuarios where correo = $1 and clave = md5($2)`
    let valores = [info.correo.toLowerCase(),info.clave]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

let generarToken = (usuario) => {
    delete usuario.contraseña;
    let token = jwt.sign(usuario,secret_key)
    return token;
}

let verificarToken = token => {
    return jwt.verify(token,secret_key);
}

module.exports = {validarLogin,consultarUsuario,generarToken,verificarToken};