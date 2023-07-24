import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import conectarDB from "./config/db.js"
import usuarioRoutes from "./routes/usuarioRoutes.js"
import proyectoRoutes from "./routes/proyectoRoutes.js"
import tareaRoutes from "./routes/tareaRoutes.js"


const app = express()
app.use(express.json())

dotenv.config()

conectarDB()

// Configurar CORS
const whitelist = ["http://127.0.0.1:5173", "http://localhost:5173"]

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.includes(origin)) {
            // Tiene los permisos para consultar la API
            callback(null, true)
        } else {
            // No tiene permisos para consultar la API
            callback(new Error("Error de Cors. No permitido"), false)
        }
    }
}

app.use(cors(corsOptions))

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