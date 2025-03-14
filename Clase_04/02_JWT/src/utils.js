import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Crypto functions
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => {
    console.log(`Datos a validar: user-password: ${user.password}, password: ${password}`);
    return bcrypt.compareSync(password, user.password);
}

// TODO: JWT
//JSON Web Tokens JWT functinos:
const PRIVATE_KEY = "CoderhouseBackendCourseSecretKeyJWT";
/**
 * Generate token JWT usando jwt.sign:
 * Primer argumento: objeto a cifrar dentro del JWT
 * Segundo argumento: La llave privada a firmar el token.
 * Tercer argumento: Tiempo de expiración del token.
 */
export const generateJWToken = (user) => {
    return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' });
};
/**
 * Metodo que autentica el token JWT para nuestros requests.
 * OJO: Esto actúa como un middleware, observar el next.
 * @param {*} req Objeto de request
 * @param {*} res Objeto de response
 * @param {*} next Pasar al siguiente evento.
 */
export const authToken = (req, res, next) => {
    //El JWT token se guarda en los headers de autorización.
    const authHeader = req.headers.authorization;
    console.log("Token present in header auth:");
    console.log(authHeader);
    if (!authHeader) {
        return res.status(401).send({ error: "User not authenticated or missing token." });
    }
    const token = authHeader.split(' ')[1]; //Se hace el split para retirar la palabra Bearer.
    //Validar token
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).send({ error: "Token invalid, Unauthorized!" });
        //Token OK
        req.user = credentials.user;
        console.log(req.user);
        next();
    });
};
export default __dirname;