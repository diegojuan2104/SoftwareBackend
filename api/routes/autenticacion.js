//importar librerias
const express = require('express')
const router = express.Router()
const {validarLogin,consultarUsuarioIdentificacion,consultarUsuarioCorreo,generarToken,verificarToken,desencriptarToken} = require('../controllers/autenticacion')

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

/**
 * Endpoint que envia la identificacion o el correo y la contraseña para hacer el login
 */
router.post("/login",(req,res) => {
    try {
        validarLogin(req.body)
        if(req.body.correo.indexOf('@') === -1){
            consultarUsuarioIdentificacion(req.body).then(respuesta => {
                if(respuesta.rowCount > 0){
                    let token = generarToken(respuesta.rows[0])
                    res.status(200).send({ok:true, mensaje:"Usuario Autenticado", info: token, usuario:{id:respuesta.rows[0].id,rol:respuesta.rows[0].rol}})
                }else{
                    res.status(400).send({ok:false, mensaje:"Usuario y/o contraseña incorrecta", info: {}})
                }
            }).catch(error => {
                res.status(500).send(error);
            })
        }else{
            consultarUsuarioCorreo(req.body).then(respuesta => {
                if(respuesta.rowCount > 0){
                    let token = generarToken(respuesta.rows[0])
                    res.status(200).send({ok:true, mensaje:"Usuario Autenticado", info: token, usuario:{id:respuesta.rows[0].id,rol:respuesta.rows[0].rol}})
                }else{
                    res.status(400).send({ok:false, mensaje:"Usuario y/o contraseña incorrecta", info: {}})
                }
            }).catch(error => {
                res.status(500).send(error);
            })
        }
        
    } catch (error) {
        res.status(400).send(error)
    }
})

/**
 * Endpoint que envia el token cada vez que se quiere pasar de pagina para ser validado
 */
router.get('/autenticacion',(req,res) => {
    res.status(200).send({ok:true, mensaje:"Autenticado"})
})

/**
 * Endpoint que envia el token para desencriptarlo y enviar la informacion 
 */
router.get('/autenticacion/:token',(req,res) => {
    let token = req.params.token
    res.send(desencriptarToken(token));
})

module.exports = router;