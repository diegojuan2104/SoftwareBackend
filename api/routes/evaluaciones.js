//importar librerias
const express = require('express')
const router = express.Router()
const base64 = require('base64topdf')
const {validarInformacion,guardarInformacionEvaluacion,obtenerInformacionEvaluacion,actualizarEstadoPropuesta,obtenerTareasDePropuesta} = require('../controllers/evaluaciones')

/**
 * Endpoint que obtiene todas las evaluaciones
 */
router.get('/evaluaciones',(req,res) => {
    obtenerInformacionEvaluacion().then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
})

/**
 * Endpoint que obtiene las tareas de una propuestas en especifico
 */
router.get('/evaluaciones/:id',(req,res) => {
    let id = req.params.id
    obtenerTareasDePropuesta(id).then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
})

/**
 * Endpoint que guarda la evaluacion de una propuesta
 */
router.post('/evaluaciones',(req,res) => {
    try {
        let info = req.body
        let archivo = ""
        let archivoConvertido = ""
        //Se invoca el metodo que validara la informacion
        validarInformacion(info)
        try {
            archivo = req.files.archivo;
            //Se convierte el archivo a base64
            archivoConvertido = base64.base64Encode(archivo.tempFilePath);
        } catch (error) {
            //La variable queda vacia
        }
        //Se invoca el metodo que guarda la informacion en la base de datos siempre y cuando no hayan errores
        guardarInformacionEvaluacion(info,archivoConvertido)
        res.send({ok:true, mensaje:"La informacion se guardo correctamente", info: info})
    } catch (error) {
        res.send(error)
    }
})

/**
 * Endpoint que actualiza el estado de una propuesta al ser calificada
 */
router.put('/evaluaciones/:id',(req,res) => {
    let id = req.params.id
    let estado = req.body.estado
    actualizarEstadoPropuesta(id,estado).then(respuesta => {
        res.send(respuesta);
    }).catch(error => {
        res.send(error)
    })
})




module.exports = router;