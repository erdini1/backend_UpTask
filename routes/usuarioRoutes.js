import express from 'express';
const router = express.Router();

import {
    autenticar,
    registrar,
    confirmar,
    olvidePassword,
    comprobarToken
} from '../controllers/usuarioController.js';

// Autenticación, Registro, y Confirmación de usuarios
router.post('/', registrar); //Crear un nuevo registro
router.post('/login', autenticar); //Login
router.get('/confirmar/:token', confirmar); //Confirmar cuenta
router.post("/olvide-password", olvidePassword) //Recuperar la contraseña
router.get("/olvide-password/:token", comprobarToken) //Comprobar usuario y token

export default router;
