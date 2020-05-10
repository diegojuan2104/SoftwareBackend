const express = require('express')
const router = express.Router()
const {validarInformacion,guardarInformacionPropuesta,obtenerInformacionPropuesta,obtenerInformacionEspecifica,eliminarInformacionPropuesta,actualizarInformacionPropuesta} = require('../controllers/propuestas')

router.get('/',(req,res) => {
    res.send("Bienvenido a la api de gestion convenios")
})

router.get('/propuestas',(req,res) => {
    obtenerInformacionPropuesta().then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        res.send(error)
    })
})

router.get('/propuestas/:id',(req,res) => {
    let id = req.params.id
    obtenerInformacionEspecifica(id).then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
})


router.post('/propuestas',(req,res) => {
    try {
        let info = req.body
        //Se invoca el metodo que validara la informacion
        validarInformacion(info)
        //Se invoca el metodo que guarda la informacion en la base de datos siempre y cuando no hayan errores
        guardarInformacionPropuesta(info).then(respuesta => {
            res.send({ok:true, mensaje:"La informacion se guardo correctamente", info: respuesta})
        }).catch(error => {
            res.send(error)
        })
    } catch (error) {
        res.send(error)
    }
})

router.put('/propuestas/:id',(req,res) => {
    let id = req.params.id;
    let info = req.body
    actualizarInformacionPropuesta(id,info).then(respuesta => {
        res.send(respuesta);
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
})

router.delete('/propuestas/:id',(req,res) => {
    let id = req.params.id;
    eliminarInformacionPropuesta(id).then(respuesta => {
        res.send(respuesta)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
})

module.exports = router;