import express from 'express';
const router = express.Router();

import { autenticar, registrar, confirmar } from '../controllers/usuarioController.js';

// Autenticación, Registro, y Confirmación de usuarios
router.post('/', registrar); //Crear un nuevo usuario
router.post('/login', autenticar); //Login del usuario
router.get('/confirmar/:token', confirmar); //Confirmar cuenta del usuario

export default router;
