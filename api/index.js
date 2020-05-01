//importar librerias
const express = require('express')
const cors = require('cors')

//inicializar la libreria
const app = express()
app.use(express.json())
app.use(cors())

//importar las rutas con los endpoints especificos
const rutasPropuestas = require('./routes/propuestas')
app.use(rutasPropuestas)
const rutasEvaluaciones = require('./routes/evaluaciones')
app.use(rutasEvaluaciones)

//puerto
const port = 3001

//Levantar el servidor para escuchar los puertos
app.listen(port,() => {
    console.log(`Escuchando api en http://localhost:${port}`)
})