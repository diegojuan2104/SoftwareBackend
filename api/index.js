//importar librerias
const express = require('express')
const cors = require('cors')

//inicializar la libreria
const app = express()
app.use(express.json())
app.use(cors())

//versiones
const vs = "/api/v1/"

//importar las rutas con los endpoints especificos
const rutasPropuestas = require('./routes/propuestas')
app.use(vs,rutasPropuestas)
const rutasEvaluaciones = require('./routes/evaluaciones')
app.use(vs,rutasEvaluaciones)

//puerto
const port = 3001

//Levantar el servidor para escuchar los puertos
app.listen(port,() => {
    console.log(`Escuchando api en http://localhost:${port}`)
})