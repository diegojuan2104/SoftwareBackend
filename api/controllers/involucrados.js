//Importar servicio de postgres
const ServicioPG = require('../services/pg')
const jwt = require('jsonwebtoken')

/**
 * Validar informacion que se quiere insertar
 * @param {*} info 
 */

let validarInvolucrados = info => {
    if(!info.idPropuesta || !info.entidades || !info.idUsuario){
        throw {
            ok:false, 
            mensaje:"Todos los campos son obligatorios"
        };
    }
}

/**
 * Metodo que guarda en la base de datos la informacion
 * @param {*} info 
 */

let guardarInfoInvolucrados = async (info,entidad) => {
    let servicio = new ServicioPG()
    let sql = `insert into cm_involucrados(id_propuesta,id_entidad,id_usuario) 
    values($1,$2,$3)`
    let valores = [info.idPropuesta,entidad,info.idUsuario]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

let obtenerIdEntidades = async (entidad) => {
    let servicio = new ServicioPG()
    let sql = `select id from cm_entidades where nombre = $1`
    let valores = [entidad]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

let obtenerEntidadesDePropuesta = async (idPropuesta) => {
    let servicio = new ServicioPG()
    let sql = `select id_propuesta,cm_entidades.nombre as nombre_entidad,id_usuario,acc_usuarios.nombre as nombre_usuario,acc_usuarios.apellidos from cm_involucrados
    inner join cm_entidades on cm_involucrados.id_entidad = cm_entidades.id 
    inner join acc_usuarios on cm_involucrados.id_usuario = acc_usuarios.id
    where id_propuesta = $1`
    let valores = [idPropuesta]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

module.exports = {validarInvolucrados,guardarInfoInvolucrados,obtenerIdEntidades,obtenerEntidadesDePropuesta}