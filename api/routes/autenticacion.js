const express = require('express')
const router = express.Router()
const {validarLogin,consultarPropuesta} = require('../controllers/autenticacion')

router.post("/login",(req,res) => {
    try {
        validarLogin(req.body)
        consultarPropuesta(req.body).then(respuesta => {
            if(respuesta.rowCount > 0){
                res.status(200).send({ok:true, mensaje:"Usuario Autenticado", info: {}})
            }else{
                res.status(400).send({ok:false, mensaje:"Usuario y/o contraseña incorrecta", info: {}})
            }
        }).catch(error => {
            res.status(500).send(error);
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;