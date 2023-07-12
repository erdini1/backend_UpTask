import mongoose from "mongoose";

const proyectoSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    descripcion: {
        type: String,
        trim: true,
        required: true
    },
    fechaEntrega: {
        type: Date,
        default: Date.now()
    },
    cliente: {
        type: String,
        trim: true,
        required: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,   //Esto es para relacionar con el modelo de usuario
        ref: "Usuario",
    },
    colaboradores: [
        {
            type: mongoose.Schema.Types.ObjectId,   //Esto es para relacionar con el modelo de usuario
            ref: "Usuario",
        },
    ],
},
    {
        timestamps: true,
    }
)

const Proyecto = mongoose.model("Proyecto", proyectoSchema)
export default Proyecto