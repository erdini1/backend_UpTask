import express from "express"
import dotenv from "dotenv"
import conectarDB from "./config/db.js"

const app = express()

dotenv.config()

conectarDB()

// Esto es para que utilice el puerto que se le asigne cuando se suba pero si no hay como es el caso de desarrollo se utiliza el puerto 4000
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})