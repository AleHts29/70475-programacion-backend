import { Router } from "express";
import { userModel } from '../models/user.model.js'
const router = Router();



// Aqui van todas las APIs para usuarios
// GET /api/users
router.get("/", async (req, res) => {
    try {
        // Obtener los usuarios de la base de datos
        //...
        // Modelo de Moongoose
        let users = await userModel.find()

        res.send({ result: "Success", payload: users }); // Devuelve los usuarios en formato JSON

    } catch (error) {
        console.log("No se pudo obtener los usuarios en mongo - error" + error);
        res.status(500).json({ error: "No se pudo obtener los usuarios en mongo" });
    }
})

// POST /api/users
router.post("/", async (req, res) => {
    try {
        // Crear un nuevo usuario en la base de datos
        //...
        // Modelo de Moongoose
        const { first_name, last_name, email, age } = req.body

        // TODO - Faltan validaciones de datos


        let userResult = await userModel.create({ first_name, last_name, email, age })

        res.send({ result: "Success", payload: userResult }); // Devuelve el usuario creado en formato JSON

    } catch (error) {
        console.log("No se pudo crear el usuario en mongo - error" + error);
        res.status(500).json({ error: "No se pudo crear el usuario en mongo" });
    }
})

// PUT /api/users
router.put("/:id", async (req, res) => {
    try {
        const userUpdated = req.body

        // TODO - Falta validaciones

        let userResult = await userModel.updateOne({ _id: req.params.id }, userUpdated)
        res.send({ result: "Success", payload: userResult }); // Devuelve el usuario actualizado en formato JSON
    } catch (error) {
        console.log("No se pudo actualizar el usuario en mongo - error" + error);
        res.status(500).json({ error: "No se pudo actualizar el usuario en mongo" });
    }
})

// DELETE /api/users
router.delete("/:id", async (req, res) => {
    try {
        let userResult = await userModel.deleteOne({ _id: req.params.id })
        res.send({ result: "Success", payload: userResult }); // Devuelve el usuario actualizado en formato JSON
    } catch (error) {
        console.log("No se pudo eliminar el usuario en mongo - error" + error);
        res.status(500).json({ error: "No se pudo eliminar el usuario en mongo" });
    }
})


export default router;