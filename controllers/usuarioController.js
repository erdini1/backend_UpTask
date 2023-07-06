import Usuario from "../models/Usuario.js"
import generarId from "../helpers/generarId.js"

const registrar = async (req, res) => {
    //Evitar registros duplicados
    const { email } = req.body
    const existeUsuario = await Usuario.findOne({ email })
    if (!existeUsuario) {
        try {
            const usuario = new Usuario(req.body)
            usuario.token = generarId()
            const usuarioAlmacenado = await usuario.save()
            res.json(usuarioAlmacenado)
        } catch (error) {
            console.log(error)
        }
    } else {
        const error = new Error("Usuario ya registrado")
        return res.status(400).json({ msg: error.message })
    }
}

const autenticar = async (req, res) => {

}

export {
    registrar,
    autenticar
}