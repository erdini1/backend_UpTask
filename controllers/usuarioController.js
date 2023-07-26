import Usuario from "../models/Usuario.js"
import generarId from "../helpers/generarId.js"
import generarJWT from "../helpers/generarJWT.js"
import { emailRegistro, emailOlvidePassword } from "../helpers/email.js"

const registrar = async (req, res) => {
    //Evitar registros duplicados
    const { email } = req.body
    const existeUsuario = await Usuario.findOne({ email })
    if (!existeUsuario) {
        try {
            const usuario = new Usuario(req.body)
            usuario.token = generarId()
            await usuario.save()

            // Enviar el email de confirmación
            emailRegistro({
                email: usuario.email,
                nombre: usuario.nombre,
                token: usuario.token
            })

            res.json({ msg: "Usuario creado correctamente, Comprueba tu correo para confirmar tu cuenta" })
        } catch (error) {
            console.log(error)
        }
    } else {
        const error = new Error("Usuario ya registrado")
        return res.status(400).json({ msg: error.message })
    }
}

const autenticar = async (req, res) => {
    // Comprobar si el usuario existe
    const { email, password } = req.body
    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
        const error = new Error("El usuario no existe")
        return res.status(404).json({ msg: error.message })
    }

    // Comprobar si el usuario esta confirmado
    if (!usuario.confirmado) {
        const error = new Error("Tu cuenta no fue confirmada")
        return res.status(403).json({ msg: error.message })
    }

    // Comprobar la contraseña del usuario
    if (await usuario.comprobarPassword(password)) {
        res.status(200).json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)
        })
    } else {
        const error = new Error("Contraseña incorrecta")
        return res.status(403).json({ msg: error.message })
    }
}

const confirmar = async (req, res) => {
    const { token } = req.params
    const usuarioConfirmar = await Usuario.findOne({ token })
    if (!usuarioConfirmar) {
        const error = new Error("Token no valido")
        return res.status(403).json({ msg: error.message })
    }
    try {
        usuarioConfirmar.confirmado = true
        usuarioConfirmar.token = ""
        await usuarioConfirmar.save()
        res.status(200).json({ msg: "Usuario confirmado correctamente" })
    } catch (error) {
        console.log(error)
    }
}

const olvidePassword = async (req, res) => {
    const { email } = req.body
    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
        const error = new Error("El usuario no existe")
        return res.status(404).json({ msg: error.message })
    }

    try {
        usuario.token = generarId()
        await usuario.save()

        // Enviar un email con el token de recuperación
        emailOlvidePassword({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        })

        res.status(200).json({ msg: "Revisa tu correo para recuperar tu contraseña" })
    } catch (error) {
        console.log(error)
    }
}

const comprobarToken = async (req, res) => {
    const { token } = req.params
    const tokenValido = await Usuario.findOne({ token })
    if (!tokenValido) {
        const error = new Error("Token no valido")
        return res.status(403).json({ msg: error.message })
    }
    res.status(200).json({ msg: "Token válido y Usuario existente" })
}

const nuevoPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body
    const usuario = await Usuario.findOne({ token })
    if (!usuario) {
        const error = new Error("Token no valido")
        return res.status(403).json({ msg: error.message })
    }

    try {
        usuario.password = password
        usuario.token = ""
        await usuario.save()
        return res.status(200).json({ msg: "Contraseña modificada correctamente" })
    } catch (error) {
        console.log(error)
    }
}

const perfil = async (req, res) => {
    const { usuario } = req
    res.status(200).json(usuario)
}

export {
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil
}