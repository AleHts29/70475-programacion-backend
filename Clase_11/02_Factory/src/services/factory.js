import MongoSingleton from '../config/mongodb-singleton.js'
import config from '../config/config.js';


let studentService
let coursesService


async function initializeMongoService() {
    console.log("Iniciando servico para Mongo");
    try {
        await MongoSingleton.getInstance()
    } catch (error) {
        console.error("Error al iniciar MongoDB:", error);
        process.exit(1); // Salir con código de error
    }

}



switch (config.persistence) {
    case 'mongodb':
        // Conexion de MongoDB
        initializeMongoService()

        const { default: StudentServiceMongo } = await import("./dao/mongo/students.service.js")
        studentService = new StudentServiceMongo() // se crea isntacia de la clase
        console.log("Servicio de estudiantes cargado:");
        console.log(studentService);

        const { default: CoursesServiceMongo } = await import("./dao/mongo/courses.service.js")
        coursesService = new CoursesServiceMongo() // se crea isntacia de la clase
        console.log("Servicio de cursos cargado:");
        console.log(coursesService);

        break;

    case 'files':
        const { default: StudentServiceFileSystem } = await import("./dao/filesystem/students.service.js")
        studentService = new StudentServiceFileSystem() // se crea isntacia de la clase
        console.log("Servicio de estudiantes cargado:");
        console.log(studentService);

        const { default: CoursesServiceFileSystem } = await import("./dao/filesystem/courses.service.js")
        coursesService = new CoursesServiceFileSystem() // se crea isntacia de la clase
        console.log("Servicio de cursos cargado:");
        console.log(coursesService);

        break;

    case 'sql':
        // Implementaciones de SQL
        break;

    default:
        break;
}


export { studentService, coursesService }