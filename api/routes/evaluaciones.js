const express = require('express')
const router = express.Router()
const base64 = require('base64topdf')
const {validarInformacion,guardarInformacionEvaluacion,obtenerInformacionEvaluacion} = require('../controllers/evaluaciones')

router.get('/evaluaciones',(req,res) => {
    obtenerInformacionEvaluacion().then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
})

router.post('/evaluaciones',(req,res) => {
    try {
        let info = req.body
        let archivo = req.files.archivo
        //Se invoca el metodo que validara la informacion
        validarInformacion(info)
        //Se convierte el archivo a base64
        let archivoConvertido = base64.base64Encode(archivo.tempFilePath)
        //Se invoca el metodo que guarda la informacion en la base de datos siempre y cuando no hayan errores
        guardarInformacionEvaluacion(info,archivoConvertido)
        res.send({ok:true, mensaje:"La informacion se guardo correctamente", info: info})
    } catch (error) {
        res.send(error)
    }
})


module.exports = router;