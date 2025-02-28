import { Router } from 'express';
import userModel from '../models/user.model.js'
import { createHash, isValidPassword } from '../utils.js'

const router = Router();


// Register
router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        console.log("Registrando usuario:");
        console.log(req.body);

        // Verifico si el user que me pasan ya existe
        const userExists = await userModel.findOne({ email })
        if (userExists) return res.status(400).json({ message: 'User ya existe' });


        let newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password), // <--- esto se va a encryptar
        }

        console.log("newUser:", newUser);


        const result = await userModel.create(newUser)

        res.send({ status: "success", message: "Usuario creado con extito con ID: " + result.id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });


        // Validamos si el password es correcto
        if (!isValidPassword(user, password)) {
            return res.status(401).send({ message: "Credenciales incorrectas", error: "ERROR" })
        }

        // Si encontramos el user y la validación del password es correcta
        // Creamon la session del User
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: `${user.email}`,
            age: `${user.age}`,
        }

        res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

export default router;