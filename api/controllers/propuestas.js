//Importar servicio de postgres
const ServicioPG = require('../services/pg')

/**
 * Validar informacion que se quiere insertar
 * @param {*} info 
 */

let validarInformacion = info => {
    if(!info.identificacion || !info.nombreEntidad || !info.ocupacionPersona || !info.nombreCompletoPersona || !info.email || !info.telefonoPersona || !info.direccionPersona || !info.tipoConvenio || !info.descripcionIniciativa || !info.estadoConvenio){
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
    let sql = `INSERT INTO public.propuesta(
        identificacion, nombreentidad, ocupacionpersona, nombrecompletopersona, email, telefonopersona, direccionpersona, tipoconvenio, descripcioniniciativa, posiblesbeneficios, estadoconvenio)
        VALUES ('${info.identificacion}', '${info.nombreEntidad}', '${info.ocupacionPersona}', '${info.nombreCompletoPersona}', '${info.email}', '${info.telefonoPersona}', '${info.direccionPersona}','${info.tipoConvenio}', '${info.descripcionIniciativa}', '${info.posiblesBeneficios}', '${info.estadoConvenio}');`
    let respuesta = await servicio.ejecutarSQL(sql)
    return respuesta;
}

/**
 * Metodo que obtiene informacion de la base de datos
 */
let obtenerInformacionPropuesta = async () => {
    let servicio = new ServicioPG()
    let sql = `SELECT idpropuesta, identificacion, nombreentidad, ocupacionpersona, nombrecompletopersona, email, telefonopersona, direccionpersona, tipoconvenio, descripcioniniciativa, posiblesbeneficios, estadoconvenio
	FROM public.propuesta order by idpropuesta;`
    let respuesta = await servicio.ejecutarSQL(sql)
    return respuesta;
}

/**
 * Metodo que elimina informacion de la base de datos
 */
let eliminarInformacionPropuesta = async (id) => {
    let servicio = new ServicioPG()
    let sql = `delete from propuesta where idpropuesta = ${id}`
    let respuesta = await servicio.ejecutarSQL(sql)
    return respuesta;
}

/**
 * Metodo que actualiza informacion de la base de datos
 * @param {*} id 
 * @param {*} info 
 */
let actualizarInformacionPropuesta = async (id, info) => {
    let servicio = new ServicioPG()
    let sql = `UPDATE public.propuesta
	SET identificacion='${info.identificacion}', nombreentidad='${info.nombreEntidad}', ocupacionpersona='${info.ocupacionPersona}', nombrecompletopersona='${info.nombreCompletoPersona}', email='${info.email}', telefonopersona='${info.telefonoPersona}', direccionpersona='${info.direccionPersona}', tipoconvenio='${info.tipoConvenio}', descripcioniniciativa='${info.descripcionIniciativa}', posiblesbeneficios='${info.posiblesBeneficios}', estadoconvenio='${info.estadoConvenio}'
	WHERE idpropuesta = ${id};`
    let respuesta = await servicio.ejecutarSQL(sql)
    return respuesta;
}



module.exports = {validarInformacion,guardarInformacionPropuesta,obtenerInformacionPropuesta,eliminarInformacionPropuesta,actualizarInformacionPropuesta};