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
const rutasLogin = require('./routes/autenticacion')
app.use(vs,rutasLogin)

const rutasPropuestas = require('./routes/propuestas')
app.use(vs,rutasPropuestas)

const rutasEvaluaciones = require('./routes/evaluaciones')
app.use(vs,rutasEvaluaciones)

const rutasInvolucrados = require('./routes/involucrados')
app.use(vs,rutasInvolucrados)

const rutasEntidades = require('./routes/entidades')
app.use(vs,rutasEntidades)

//puerto
const port = 3001

//Levantar el servidor para escuchar los puertos
app.listen(port,() => {
    console.log(`Escuchando api en http://localhost:${port}`)
})