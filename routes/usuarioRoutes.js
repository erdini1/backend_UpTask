import express from "express";
const router = express.Router()

import { usuarios } from "../controllers/usuarioController.js";

router.get("/", usuarios)

export default router