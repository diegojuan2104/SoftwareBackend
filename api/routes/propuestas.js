//importar librerias
const express = require('express')
const router = express.Router()
const {validarInformacion,guardarInformacionPropuesta,obtenerInformacionPropuesta,obtenerInformacionEspecifica,eliminarInformacionPropuesta,actualizarInformacionPropuesta,obtenerIdPropuesta,obtenerPropuestasDeUsuario} = require('../controllers/propuestas')

/**
 * Endpoint default
 */
router.get('/',(req,res) => {
    res.send("Bienvenido a la api de gestion convenios")
})

/**
 * Endpoint que obtiene las propuestas
 */
router.get('/propuestas',(req,res) => {
    obtenerInformacionPropuesta().then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        res.send(error)
    })
})

/**
 * Endpoint que obtiene una propuesta en especifico
 */
router.get('/propuestas/:id',(req,res) => {
    let id = req.params.id
    obtenerInformacionEspecifica(id).then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
})

/**
 * Endpoint que obtiene las propuestas de un usuario
 */
router.get('/propuestasUsuarios/:idUsuario',(req,res) => {
    let id = req.params.idUsuario
    obtenerPropuestasDeUsuario(id).then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
})

/**
 * Endpoint que envia la informacion de una propuesta
 */
router.post('/propuestas',(req,res) => {
    try {
        let info = req.body
        //Se invoca el metodo que validara la informacion
        validarInformacion(info)
        //Se invoca el metodo que guarda la informacion en la base de datos siempre y cuando no hayan errores
        guardarInformacionPropuesta(info).then(respuesta => {
            obtenerIdPropuesta().then(respuesta => {
                res.send({ok:true, mensaje:"La informacion se guardo correctamente", info: info, id: respuesta.rows[0]})
            }).catch(error => {
                res.send(error)
            })
        }).catch(error => {
            res.send(error)
        })
       
    } catch (error) {
        res.send(error)
    }
})

/**
 * Endpoint que actualiza una propuesta
 */
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

/**
 * Endpoint que elimina una propuesta
 */
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