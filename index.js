import express from "express"
import dotenv from "dotenv"
import conectarDB from "./config/db.js"
import usuarioRoutes from "./routes/usuarioRoutes.js"
import proyectoRoutes from "./routes/proyectoRoutes.js"
import tareaRoutes from "./routes/tareaRoutes.js"


const app = express()
app.use(express.json())

dotenv.config()

conectarDB()

//Rotuing Usuarios
app.use("/api/usuarios", usuarioRoutes)

//Routing Proyectos
app.use("/api/proyectos", proyectoRoutes)

// Routing Tareas
app.use("/api/tareas", tareaRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})