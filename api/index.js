//importar librerias
const express = require('express')
const cors = require('cors')
const fileupload = require('express-fileupload')
require("./server/keys")

//inicializar la libreria
const app = express()
app.use(express.json())
app.use(cors())
app.use(fileupload({
    useTempFiles: true,
}))

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

const rutasTareas = require('./routes/tareas')
app.use(vs,rutasTareas)

const rutasCorreos = require('./routes/correos')
app.use(vs,rutasCorreos)

//puerto
const port = process.env.PORT_NODE

//Levantar el servidor para escuchar los puertos
app.listen(port,() => {
    console.log(`Escuchando api en http://localhost:${port}`)
})