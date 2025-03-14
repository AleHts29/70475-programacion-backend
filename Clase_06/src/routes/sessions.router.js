import { Router } from 'express';
import passport from 'passport';
import userModel from '../models/user.model.js'
import { isValidPassword, generateJWToken } from '../utils.js'


const router = Router();

router.get("/github", passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });

router.get("/githubcallback", passport.authenticate('github', { failureRedirect: '/github/error' }), async (req, res) => {
    const user = req.user;
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    };
    req.session.admin = true;
    res.redirect("/users");
});



router.post("/register", passport.authenticate(
    'register', { failureRedirect: '/api/sessions/fail-register' })
    , async (req, res) => {
        console.log("Registrando nuevo usuario.");
        res.status(201).send({ status: "success", message: "Usuario creado con extito." });
    });

// router.post("/login", passport.authenticate(
//     'login', { failureRedirect: '/api/sessions/fail-login' })
//     , async (req, res) => {
//         console.log("User found to login:");
//         const user = req.user;
//         console.log(user);
//         if (!user) return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });
//         // req.session.user = {
//         //     name: `${user.first_name} ${user.last_name}`,
//         //     email: user.email,
//         //     age: user.age
//         // };
//         // req.session.admin = true;
//         // res.send({ status: "success", payload: req.session.user, message: "Primer logueo realizado!! :)" })

//         // usando JWT
//         const access_token = generateJWToken(user);
//         console.log(access_token);
//         res.send({ access_token: access_token });
//     });

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await userModel.findOne({ email: email });
        if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

        if (!isValidPassword(user, password)) {
            console.warn("Invalid credentials for user: " + email);
            return res.status(401).send({ status: "error", error: "Credenciales invalidas!!!" });
        }


        // Generar un Obj para el JWT - DTO (no agregamos data sencible)
        const tokenUser = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            role: user.role
        }

        // genramos el JWT
        const access_token = generateJWToken(tokenUser)
        console.log("access_token", access_token);


        //2do con Cookie
        res.cookie("jwtCookieToken", access_token, {
            maxAge: 60000,
            httpOnly: true, // iNo se expone la cookie
            // secure: false // si está en HTTPS, si no, no se expone la cookie
        })

        res.send({ message: "Login successfull" })


    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: "error", error: "Error interno de la applicacion." });
    }




})





router.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Failed to process register!" });
});

router.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Failed to process login!" });
});

export default router;