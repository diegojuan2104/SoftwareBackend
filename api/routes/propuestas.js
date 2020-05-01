const express = require('express')
const router = express.Router()

router.get('/',(req,res) => {
    res.send("Bienvenido a la api de propuestas")
})

router.get('/propuestas',(req,res) => {
    res.send("propuestas")
})

module.exports = router;