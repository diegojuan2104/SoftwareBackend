//importar las librerias
const express = require('express')
const router = express.Router()
const {enviarCorreo} = require('../controllers/correos')

/**
 * Endpoint que llama al metodo que envia correos y manda el correo del receptor
 */
router.post('/correos',(req,res) => {
    let correo = req.body.correo;
    try {
        enviarCorreo(correo);
        res.send("Se envio el correo correctamente")
    } catch (error) {
        console.log(error)
        res.send(error)
    }
});

module.exports = router;