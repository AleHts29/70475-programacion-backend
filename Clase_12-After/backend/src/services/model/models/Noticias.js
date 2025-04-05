// Se importa Joi, una librería de validación de datos para objetos JavaScript
import Joi from 'joi';

// Se define una clase llamada Noticias
class Noticias {
    // El constructor define las propiedades que tendrá una instancia de Noticias
    constructor(titulo, cuerpo, autor, imagen, email, vista) {
        this.titulo = titulo;
        this.cuerpo = cuerpo;
        this.autor = autor;
        this.imagen = imagen;
        this.email = email;
        this.vista = vista;
    }

    // Método estático para validar una noticia usando Joi
    // - noticia: el objeto a validar
    // - requerido: booleano que indica si todos los campos deben ser obligatorios
    static validar(noticia, requerido) {
        // Se define un esquema de validación con Joi
        // Si "requerido" es true, todos los campos serán obligatorios (con `.required()`)
        // Si no, solo se valida el tipo sin obligar que esté presente
        const NoticiasSchema = Joi.object({
            titulo: requerido ? Joi.string().required() : Joi.string(),
            cuerpo: requerido ? Joi.string().required() : Joi.string(),
            autor: requerido ? Joi.string().required() : Joi.string(),
            imagen: requerido ? Joi.string().required() : Joi.string(),
            email: requerido ? Joi.string().required() : Joi.string(),
            vista: requerido ? Joi.boolean().required() : Joi.boolean()
        });

        // Se valida el objeto "noticia" contra el esquema
        const { error } = NoticiasSchema.validate(noticia);

        // Si hubo un error en la validación, se lanza la excepción
        if (error) {
            throw error;
        }
    }
}

// Se exporta la clase Noticias para que pueda ser usada en otros módulos
export default Noticias;