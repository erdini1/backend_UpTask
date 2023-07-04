import express from "express";
const router = express.Router()

router.get("/", (req, res) => {
    res.json("Desde API/USUARIOS")
})

export default router