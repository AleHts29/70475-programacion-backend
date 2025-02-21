import mongoose from "mongoose";

// Definimos el nombre de la collection
const UserCollection = 'usuarios'


// Definimos el schema
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: Number
})


// Exportar
export const userModel = mongoose.model(UserCollection, userSchema)