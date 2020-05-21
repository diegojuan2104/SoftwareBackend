//importar librerias
const express = require('express')
const router = express.Router()
const {validarInvolucrados,guardarInfoInvolucrados,obtenerEntidadesDePropuesta,eliminarInvolucrados} = require('../controllers/involucrados')

/**
 * Endpoint que envia la informacion de involucrados
 */
router.post('/involucrados',(req,res) => {
    try {
        let info = req.body
        validarInvolucrados(info)
        info.entidades.forEach(element => {
            guardarInfoInvolucrados(info,element)
        });
        res.send("Se guardo")
        
    } catch (error) {
        res.status(400).send(error)
    }
})

/**
 * Endpoint que obtiene las entidades de una propuesta
 */
router.get('/involucrados/:id',(req,res) => {
    obtenerEntidadesDePropuesta(req.params.id).then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        res.send(error)
    })
})

/**
 * Endpoint que elimina los involucrados de una propuesta
 */
router.delete('/involucrados/:id',(req,res) => {
    eliminarInvolucrados(req.params.id).then(respuesta => {
        res.send(respuesta)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
})

module.exports = router;