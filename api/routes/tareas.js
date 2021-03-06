//importar librerias
const express = require('express')
const router = express.Router()
const {obtenerTareas} = require('../controllers/tareas')

/**
 * Endpoint que obtiene las tareas
 */
router.get("/tareas",(req,res) => {
    obtenerTareas().then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        res.send(error)
    })
})

module.exports = router;