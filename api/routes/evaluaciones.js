const express = require('express')
const router = express.Router()

router.get('/evaluaciones',(req,res) => {
    res.send("evaluaciones")
})

module.exports = router;