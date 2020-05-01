//importar librerias
const express = require('express')
const cors = require('cors')

//inicializar la libreria
const app = express()
app.use(express.json())
app.use(cors())

//Endpoints
app.get("/",(req,res) => {
    res.send("Bienvenido a la Api de bookmarks")
})


//puerto
const port = 3001

//Levantar el servidor para escuchar los puertos
app.listen(port,() => {
    console.log(`Escuchando api en http://localhost:${port}`)
})