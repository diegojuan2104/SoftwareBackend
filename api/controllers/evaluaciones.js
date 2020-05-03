//Importar servicio de postgres
const ServicioPG = require('../services/pg')

/**
 * Validar informacion que se quiere insertar
 * @param {*} info 
 */

let validarInformacion = info => {
    if(!info.fechaEvaluacion || !info.observaciones || !info.estados || !info.idPropuesta){
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
    let sql = `INSERT INTO public.evaluaciones(
        fechaevaluacion,observaciones,estado,idpropuesta)
        VALUES ($1,$2, $3, $4);`
        let valores = [info.fechaEvaluacion,info.observaciones,info.estados,info.idPropuesta]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

/**
 * Metodo que obtiene informacion de la base de datos
 */
let obtenerInformacionEvaluacion = async () => {
    let servicio = new ServicioPG()
    let sql = `SELECT idevaluacion,fechaevaluacion,observaciones,estado,idpropuesta
    FROM public.evaluaciones order by idevaluacion;`
    let respuesta = await servicio.ejecutarSQL(sql)
    return respuesta;
}




module.exports = {validarInformacion,guardarInformacionEvaluacion,obtenerInformacionEvaluacion};