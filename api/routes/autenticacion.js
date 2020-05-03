const express = require('express')
const router = express.Router()
const {validarLogin} = require('../controllers/autenticacion')

router.get("/login",(req,res) => {
    try {
        let info = req.body;
        
    } catch (error) {
        res.status(400).send(error)
    }
})