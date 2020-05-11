//Importar servicio de postgres
const ServicioPG = require('../services/pg')
const jwt = require('jsonwebtoken')

let obtenerEntidades = async () => {
    let servicio = new ServicioPG()
    let sql = `select id,nombre,direccion,pagina_web,nit,pais,departamento,ciudad from cm_entidades`
    let respuesta = await servicio.ejecutarSQL(sql)
    return respuesta;
}

module.exports = {obtenerEntidades}