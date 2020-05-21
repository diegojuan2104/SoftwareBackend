//Importar servicio de postgres
const ServicioPG = require('../services/pg')

/**
 * Validar informacion que se quiere insertar
 * @param {*} info 
 */

let validarInformacion = info => {
    if(!info.infoContacto || !info.tipoConvenio || !info.descripcionIniciativa || !info.beneficios || !info.estado){
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

let guardarInformacionPropuesta = async info => {
    let servicio = new ServicioPG()
    let sql = `insert into cm_propuestas_convenios(info_contacto,tipo_convenio,descripcion_iniciativa,beneficios,estado) 
    values($1,$2,$3,$4,$5)`
        let valores = [info.infoContacto,info.tipoConvenio,info.descripcionIniciativa,info.beneficios,info.estado]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

/**
 * Metodo que obtiene informacion de la base de datos
 */
let obtenerInformacionPropuesta = async () => {
    let servicio = new ServicioPG()
    let sql = `SELECT id,info_contacto, tipo_convenio, descripcion_iniciativa, beneficios, estado
	FROM cm_propuestas_convenios order by id;`
    let respuesta = await servicio.ejecutarSQL(sql)
    return respuesta;
}

/**
 * Metodo que obtiene el id de una propuesta de la base de datos 
 */
let obtenerIdPropuesta = async () => {
    let servicio = new ServicioPG()
    let sql = `SELECT id
    from cm_propuestas_convenios
    order by id desc limit 1;`
    let respuesta = await servicio.ejecutarSQL(sql)
    return respuesta;
}

/**
 * Metodo que obtiene informacion de la base de datos de una propuesta en especifico
 */
let obtenerInformacionEspecifica = async (id) => {
    let servicio = new ServicioPG()
    let sql = `SELECT info_contacto, tipo_convenio, descripcion_iniciativa, beneficios, estado
	FROM cm_propuestas_convenios where id = $1;`
    let valores = [id]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

/**
 * Metodo que elimina informacion de la base de datos
 */
let eliminarInformacionPropuesta = async (id) => {
    let servicio = new ServicioPG()
    let sql = `delete from cm_propuestas_convenios where id = $1`
    let valores = [id]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

/**
 * Metodo que actualiza informacion de la base de datos
 * @param {*} id 
 * @param {*} info 
 */
let actualizarInformacionPropuesta = async (id, info) => {
    let servicio = new ServicioPG()
    let sql = `UPDATE cm_propuestas_convenios
	SET info_contacto=$1, tipo_convenio=$2, descripcion_iniciativa=$3, beneficios=$4, estado=$5
    WHERE id = $6;`
    let valores = [info.infoContacto,info.tipoConvenio,info.descripcionIniciativa,info.beneficios,info.estado,id]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

/**
 * Metodo que obtiene las propuestas de un usuarios en especifico de la base de datos
 * @param {*} id 
 */
let obtenerPropuestasDeUsuario = async id => {
    let servicio = new ServicioPG()
    let sql = `select distinct id_propuesta,cm_propuestas_convenios.id,info_contacto,tipo_convenio,descripcion_iniciativa,beneficios,estado,id_usuario from cm_involucrados
    inner join cm_propuestas_convenios on cm_involucrados.id_propuesta = cm_propuestas_convenios.id where id_usuario = $1`
    let valores = [id]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}



module.exports = {validarInformacion,guardarInformacionPropuesta,obtenerInformacionPropuesta,obtenerInformacionEspecifica,eliminarInformacionPropuesta,actualizarInformacionPropuesta,obtenerIdPropuesta,obtenerPropuestasDeUsuario};