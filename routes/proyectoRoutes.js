import express from "express";
import {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    obtenerTareas
} from "../controllers/proyectoController.js";
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router()

router.route("/")
    .get(checkAuth, obtenerProyectos)   // Obtener todos los proyectos del usuario autenticado
    .post(checkAuth, nuevoProyecto) // Crear nuevo proyecto con el usuario autenticado

router.route("/:id")
    .get(checkAuth, obtenerProyecto) // Obtener un proyecto especifico para el usuario autenticado
    .put(checkAuth, editarProyecto) // Editar un proyecto del usuario autenticado 
    .delete(checkAuth, eliminarProyecto) // Eliminar un proyecto del usuario autenticado

router.get("/tareas/:id", checkAuth, obtenerTareas)
router.post("/agregar-colaborador/:id", checkAuth, agregarColaborador)
router.post("/eliminar-colaborador/:id", checkAuth, eliminarColaborador)



export default router