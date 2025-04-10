import express from 'express';
import config from './config/config.js';

//Passport imports

//import Routers
import emailRouter from './routers/email.router.js';
import smsRouter from './routers/sms.router.js';

const app = express();

//JSON settings:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Declare routers:
<<<<<<< HEAD
app.use("/api/email", emailRouter);
app.use("/api/sms", smsRouter);
=======
app.use("/api/email", emailRouter);// nodemailer
app.use("/api/sms", smsRouter); // Twilio
>>>>>>> 44ea6ad (clase13)

const SERVER_PORT = config.port;
app.listen(SERVER_PORT, () => {
    console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
});