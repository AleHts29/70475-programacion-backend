import { Router } from 'express';
import userModel from '../models/user.model.js'
import { createHash, isValidPassword } from '../utils.js'

import passport from 'passport';

const router = Router();


// Register
router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/fail-register' }), async (req, res) => {
    try {

        console.log("===> Register ENDPOINT <==");

        // Sio todo salio bien, me llega el usario desde passsport
        res.status(201).send({ status: "success", message: "Usuario creado con extito." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


// Login
router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/fail-login' }), async (req, res) => {
    try {

        console.log("User found to login:");
        const user = req.user;
        console.log(user);


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


router.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Failed to process register!" });
});

router.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Failed to process login!" });
});



export default router;