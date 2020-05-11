const express = require('express')
const router = express.Router()
const {validarInvolucrados,guardarInfoInvolucrados,obtenerIdEntidades,obtenerEntidadesDePropuesta} = require('../controllers/involucrados')

router.post('/involucrados',(req,res) => {
    try {
        let info = req.body
        validarInvolucrados(info)
        info.entidades.forEach(element => {
            obtenerIdEntidades(element).then(respuesta => {
                guardarInfoInvolucrados(info,respuesta.rows[0].id)
            }).catch(error => {
                res.send(error)
            })
        });
        res.send("Se guardo")
        
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/involucrados/:id',(req,res) => {
    obtenerEntidadesDePropuesta(req.params.id).then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        res.send(error)
    })
})

module.exports = router;