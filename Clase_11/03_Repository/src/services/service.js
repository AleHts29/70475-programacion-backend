// Importamos las Clases de students y courses
import StudentDao from './dao/mongo/students.service.js'
import CoursesDao from './dao/mongo/courses.service.js';



// Importamos los RepositorioStudent y repositorioCourses
import StudentRepository from './repository/students.repository.js'
import CoursesRepository from './repository/courses.repository.js'

// Creamos instacias de las clases de students y courses
const studentDao = new StudentDao();
const coursesDao = new CoursesDao();

// Creamos los `servicios` de students y courses  <-- esto er lo que exportamos
export const studentService = new StudentRepository(studentDao)
export const coursesService = new CoursesRepository(coursesDao)
