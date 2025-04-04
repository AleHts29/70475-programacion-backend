import UserService from '../services/dao/users.dao.js'


const userService = new UserService();


export const getUsers = async (req, res) => {
    try {
        const users = await userService.getAll()
        res.send({ message: "Success!", payload: users });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los usuarios." });
    }
}

export const saveUser = async (req, res) => {
    try {

        const userData = req.body;

        // TODO: Falta hacer validaciones del user que me pasan

        const result = await userService.save(userData)
        res.status(201).json(result); // Devuelve el usuario creado en formato JSON

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los usuarios." });
    }
}


export const getUserById = async (req, res) => {
    res.send({ message: "Success!", payload: "getUserById: Por implementar" });
}
// ! EJEMPLO:: Busqueda por ID
// export const getProduct = async(req,res) => {
//     try {
//         const idProd = req.params.pid 
//         const prod = await productModel.findById(idProd)
//         if(prod)
//             res.status(200).send(prod)
//         else
//             res.status(404).send("Producto no existe")        
//     }catch(e){
//         res.status(500).send("Error al consultar producto: ", e)
//     }
// }





