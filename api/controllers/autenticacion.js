//Importar servicio de postgres
const ServicioPG = require('../services/pg')

/**
 * Validar informacion que se quiere insertar
 * @param {*} info 
 */

let validarLogin = info => {
    if(!info.documento || !info.contraseña){
        throw {
            ok:false, 
            mensaje:"Todos los campos son obligatorios"
        };
    }
}

let consultarPropuesta = async info => {
    let servicio = new ServicioPG()
    let sql = `select * from usuarios where documento = '${info.documento}' and contraseña = '${info.contraseña}'`
    let respuesta = await servicio.ejecutarSQL(sql)
    return respuesta;
}

module.exports = {validarLogin,consultarPropuesta};