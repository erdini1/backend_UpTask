import express from 'express';
const router = express.Router();
import {
    autenticar,
    registrar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil
} from '../controllers/usuarioController.js';
import checkAuth from '../middleware/checkAuth.js';

// Autenticación, Registro, y Confirmación de usuarios
router.post('/', registrar); //Crear un nuevo registro
router.post('/login', autenticar); //Login
router.get('/confirmar/:token', confirmar); //Confirmar cuenta
router.post("/olvide-password", olvidePassword) //Solicitar un token para cambiar la contraseña
router.get("/olvide-password/:token", comprobarToken) //Validar el token para cambiar la contraseña
router.post("/olvide-password/:token", nuevoPassword) //Recuperar/Modificar contraseña

router.get("/perfil", checkAuth, perfil) //Perfil con usuario autenticado

export default router;
