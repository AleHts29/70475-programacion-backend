// Import de Services - es el puente entre los controller y capa de acceso a los datos

import ProductsService from '../services/products.services.js'
const productsService = new ProductsService()

const getDatosControllers = async (req, res) => {
    try {
        let datos = await productsService.obtenerDatos()
        res.status(200).json(datos);
    } catch (error) {
        console.log(Error(error));
    }
}


const postDatosControllers = async (req, res) => {
    try {
        let dato = req.body
        // todo: se debe realizar validaciones

        let datoGuardado = await productsService.guardarDato(dato)

        res.status(201).json(datoGuardado);
    } catch (error) {
        console.log(Error(error));
    }
}


const deleteDatosControllers = async (req, res) => {
    try {
        let datoId = req.body.id

        // todo: se debe realizar validaciones

        let datoEliminado = await productsService.eliminarDato(datoId)

        res.status(200).json(datoEliminado);

    } catch (error) {
        console.log(Error(error));
    }
}



export default {
    getDatosControllers,
    postDatosControllers,
    deleteDatosControllers
}