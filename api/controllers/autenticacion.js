//Importar servicio de postgres
const ServicioPG = require('../services/pg')
const jwt = require('jsonwebtoken')

const secret_key = 'f0c67d58742c97def9cd77083340ca6d237de2e1cf8986c66bb4ef8ac0540ff787051ae0bf31868cfebfe378eb37ff53399408250f081812a56d0010b3b5eef4'

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
    let sql = `select * from acc_usuarios where correo = $1 and clave = $2`
    let valores = [info.correo,info.clave]
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