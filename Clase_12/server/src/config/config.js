import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command(); //Crea la instancia de comandos de commander.

program
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'Puerto del servidor', 9090)
    .option('--mode <mode>', 'Modo de trabajo', 'develop')
program.parse(); //Parsea los comandos y valida si son correctos.


console.log("Mode Option: ", program.opts().mode);

// Configuracion de varaibles de entorno
dotenv.config({
    path: program.opts().mode === 'production' ? './src/config/.env.production' : './src/config/.env.development'
})


export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD
}