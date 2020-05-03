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
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`
        let valores = [info.identificacion,info.nombreEntidad,info.ocupacionPersona,info.nombreCompletoPersona,info.email,info.telefonoPersona,info.direccionPersona,info.tipoConvenio,info.descripcionIniciativa,info.posiblesBeneficios,info.estadoConvenio]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
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
 * Metodo que obtiene informacion de la base de datos de una propuesta en especifico
 */
let obtenerInformacionEspecifica = async (id) => {
    let servicio = new ServicioPG()
    let sql = `SELECT idpropuesta, identificacion, nombreentidad, ocupacionpersona, nombrecompletopersona, email, telefonopersona, direccionpersona, tipoconvenio, descripcioniniciativa, posiblesbeneficios, estadoconvenio
    FROM public.propuesta where idpropuesta = $1;`
    let valores = [id]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

/**
 * Metodo que elimina informacion de la base de datos
 */
let eliminarInformacionPropuesta = async (id) => {
    let servicio = new ServicioPG()
    let sql = `delete from propuesta where idpropuesta = $1`
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
    let sql = `UPDATE public.propuesta
	SET identificacion=$1, nombreentidad=$2, ocupacionpersona=$3, nombrecompletopersona=$4, email=$5, telefonopersona=$6, direccionpersona=$7, tipoconvenio=$8, descripcioniniciativa=$9, posiblesbeneficios=$10, estadoconvenio=$11
    WHERE idpropuesta = $12;`
    let valores = [info.identificacion,info.nombreEntidad,info.ocupacionPersona,info.nombreCompletoPersona,info.email,info.telefonoPersona,info.direccionPersona,info.tipoConvenio,info.descripcionIniciativa,info.posiblesBeneficios,info.estadoConvenio,id]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}



module.exports = {validarInformacion,guardarInformacionPropuesta,obtenerInformacionPropuesta,obtenerInformacionEspecifica,eliminarInformacionPropuesta,actualizarInformacionPropuesta};