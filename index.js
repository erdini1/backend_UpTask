const express = require("express")

const app = express()

console.log("Desde Index.js")

app.listen(4000, () => {
    console.log("Servidor corriendo en puerto 4000")
})