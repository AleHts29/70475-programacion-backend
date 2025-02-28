import passport from 'passport'
import passportLocal from 'passport-local'
import userModel from '../models/user.model.js'
import { createHash, isValidPassword } from '../utils.js'


//Declaramos nuestra estrategia:
const localStrategy = passportLocal.Strategy;


/**
 * Función para inicializar Passport y definir las estrategias de autenticación.
 */
const initializePassport = () => {
    /**
     * 📌 Estrategia de Register de Usuarios
     *  Inicializando la estrategia local, username sera para nosotros email.
     *  Done será nuestro callback
    */
    passport.use('register', new localStrategy(
        /**
         * 📌 Estrategia de Registro de Usuarios
         * Utilizamos 'register' como identificador de esta estrategia.
         */
        {
            passReqToCallback: true, // Permite acceder al objeto `req` dentro de la función de autenticación
            usernameField: 'email' // Definimos que el "username" será el campo "email"
        },

        /**
         * 📌 Callback de autenticación
         * Recibe el request, el username (email), la contraseña y la función `done`
         */
        async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body; // Extraemos datos del request

            try {
                // Verificamos si el usuario ya existe en la base de datos
                const exists = await userModel.findOne({ email });
                if (exists) {
                    console.log("El usuario ya existe.");
                    return done(null, false); // Retorna `false` indicando que la autenticación falló
                }

                // Creamos un nuevo usuario con la contraseña encriptada
                const user = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                };

                // Guardamos el usuario en la base de datos
                const result = await userModel.create(user);

                // Todo salió bien, retornamos el usuario registrado
                return done(null, result);
            } catch (error) {
                return done("Error registrando el usuario: " + error);
            }
        }
    ));



    /**
    * 📌 Estrategia de Login de Usuarios
    * Utilizamos 'login' como identificador de esta estrategia.
    */
    passport.use('login', new localStrategy(
        {
            passReqToCallback: true,  // Permite acceder al objeto `req` dentro de la función de autenticación
            usernameField: 'email' // Definimos que el "username" será el campo "email"
        },
        async (req, username, password, done) => {
            try {
                // Buscamos el usuario en la base de datos por su email
                const user = await userModel.findOne({ email: username });

                if (!user) {
                    return done(null, false, { message: 'Usuario no encontrado' });
                }


                // Validamos si el password es correcto
                if (!isValidPassword(user, password)) {
                    console.warn("Credenciales invalidas ");
                    return done(null, false);
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }

    ))



    /**
   * 📌 Serialización del Usuario
   * Se ejecuta después de una autenticación exitosa.
   * Passport almacena solo el `user._id` en la sesión en lugar de todo el objeto usuario.
   */
    passport.serializeUser((user, done) => {
        done(null, user._id);
    })



    /**
    * 📌 Deserialización del Usuario
    * Cuando se hacen solicitudes autenticadas, Passport busca al usuario en la base de datos
    * usando el `id` guardado en la sesión.
    */
    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id);
            done(null, user);
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    });
}


export default initializePassport;