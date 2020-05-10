//Importar servicio de postgres
const ServicioPG = require('../services/pg')
const jwt = require('jsonwebtoken')

let obtenerEntidades = async () => {
    let servicio = new ServicioPG()
    let sql = `select id,nombre from cm_entidades`
    let respuesta = await servicio.ejecutarSQL(sql)
    return respuesta;
}

module.exports = {obtenerEntidades}