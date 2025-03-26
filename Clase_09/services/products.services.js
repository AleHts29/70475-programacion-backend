import { find, create, deleDato } from './models/produts.model.js';

export default class ProductsService {
    constructor() {
        console.log("Calling products model using a service.");
    };

    obtenerDatos = async () => {
        let users = await find();
        return users;
    };
    guardarDato = async (user) => {
        let result = await create(user);
        return result;
    };
    eliminarDato = async (id) => {
        const result = await deleDato({ id: id });
        return result;
    };
};



