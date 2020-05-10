const express = require('express')
const router = express.Router()
const {obtenerEntidades} = require('../controllers/entidades')

router.get("/entidades",(req,res) => {
    obtenerEntidades().then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        res.send(error)
    })
})

module.exports = router;