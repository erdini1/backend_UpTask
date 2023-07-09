import express from 'express';
const router = express.Router();

import {
    autenticar,
    registrar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
} from '../controllers/usuarioController.js';

// Autenticación, Registro, y Confirmación de usuarios
router.post('/', registrar); //Crear un nuevo registro
router.post('/login', autenticar); //Login
router.get('/confirmar/:token', confirmar); //Confirmar cuenta
router.post("/olvide-password", olvidePassword) //Solicitar un token para cambiar la contraseña
router.get("/olvide-password/:token", comprobarToken) //Validar el token para cambiar la contraseña
router.post("/olvide-password/:token", nuevoPassword) //Recuperar/Modificar contraseña

export default router;
