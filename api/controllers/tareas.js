//Importar servicio de postgres
const ServicioPG = require('../services/pg')

/**
 * Metodo que obtiene informacion de la base de datos
 */
let obtenerTareas = async () => {
    let servicio = new ServicioPG()
    let sql = `SELECT id,nombre, descripcion
	FROM cm_tareas where modulo = '5';`
    let respuesta = await servicio.ejecutarSQL(sql)
    return respuesta;
}

module.exports = {obtenerTareas}