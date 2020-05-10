//Importar servicio de postgres
const ServicioPG = require('../services/pg')

/**
 * Validar informacion que se quiere insertar
 * @param {*} info 
 */

let validarInformacion = info => {
    if(!info.idTarea || !info.fecha || !info.comentario || !info.estado || !info.archivo || !info.idPropuesta){
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

let guardarInformacionEvaluacion = async info => {
    let servicio = new ServicioPG()
    let sql = `insert into cm_seguimientos_propuestas(id_tarea,fecha,comentario,estado,archivo,id_propuesta) values($1,$2,$3,$4,$5,$6)`
    let valores = [info.idTarea,info.fecha,info.comentario,info.estado,info.archivo,info.idPropuesta]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

/**
 * Metodo que obtiene informacion de la base de datos
 */
let obtenerInformacionEvaluacion = async () => {
    let servicio = new ServicioPG()
    let sql = `SELECT id_tarea,fecha,comentario,estado,archivo,id_propuesta
    FROM cm_seguimientos_propuestas order by id;`
    let respuesta = await servicio.ejecutarSQL(sql)
    return respuesta;
}




module.exports = {validarInformacion,guardarInformacionEvaluacion,obtenerInformacionEvaluacion};