const express = require('express')
const router = express.Router()

router.get('/',(req,res) => {
    res.send("Bienvenido a la api de gestion convenios")
})

router.get('/propuestas',(req,res) => {
    res.send("get propuestas")
})

router.post('/propuestas',(req,res) => {
    res.send("post propuestas")
})

router.put('/propuestas',(req,res) => {
    res.send("put propuestas")
})

router.delete('/propuestas',(req,res) => {
    res.send("delete propuestas")
})

module.exports = router;