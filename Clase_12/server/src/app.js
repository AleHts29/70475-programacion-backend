import express from 'express';
import config from './config/config.js';
import MongoSingleton from './config/mongodb-singleton.js';
import cors from 'cors'


//import Routers
import usersRouter from './routes/users.router.js';
import businessRouter from './routes/business.router.js';
import ordersRouter from './routes/orders.router.js';


const app = express();

// Configuraciones Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Habilitamos sistema de CORS
app.use(cors());



//Declare routers:
app.use("/api/users", usersRouter);
app.use("/api/business", businessRouter);
app.use("/api/orders", ordersRouter);



const SERVER_PORT = config.port;
app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
})


// Conectar a MongoDB
const mongoInstance = async () => {
    try {
        await MongoSingleton.getInstance();
    } catch (error) {
        console.log(error);

    }
}
mongoInstance(); // Conectado con exito a MongoDB usando Moongose.