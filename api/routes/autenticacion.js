const express = require('express')
const router = express.Router()
const {validarLogin,consultarPropuesta,generarToken,verificarToken} = require('../controllers/autenticacion')

//MIDDLEWARE: filtro
router.use((req,res,next) => {
    try {
        let url = req.url;
        if(url != "/login"){
            let token = req.headers.token;
            let verificacion = verificarToken(token)
        }
        next();
    } catch (error) {
        res.status(401).send({ok:false, mensaje:"No autenticado", info: error})
    }
})

router.post("/login",(req,res) => {
    try {
        validarLogin(req.body)
        consultarPropuesta(req.body).then(respuesta => {
            if(respuesta.rowCount > 0){
                let token = generarToken(respuesta.rows[0])
                res.status(200).send({ok:true, mensaje:"Usuario Autenticado", info: token})
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