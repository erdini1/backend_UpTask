import nodemailer from 'nodemailer';

export const emailRegistro = async (datos) => {
    const { email, token, nombre } = datos;

    const transport = nodemailer.createTransport({
        host: process.env.HOST_MAILTRAP,
        port: process.env.PORT_MAILTRAP,
        auth: {
            user: process.env.USER_MAILTRAP,
            pass: process.env.PASSWORD_MAILTRAP
        }
    });

    // Información del email
    const info = await transport.sendMail({
        from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: 'UpTask - Comprueba tu cuenta',
        text: 'Comprueba tu cuenta en UpTask',
        html: ` <p>Bienvenido ${nombre}, confirma tu cuenta en UpTask</p>
        <p>Tu cuenta ya esta casi lista, solo debes confirmarla accediendo al siguiente enlace: </p>
        <a href="${process.env.FRONTEND_URL2}/confirmar/${token}">Comprobar Cuenta</a>

        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `
    });
};
