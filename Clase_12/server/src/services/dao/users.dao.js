// importacion del Modelo de satos de Mongoose
import usersModel from "../models/users.model.js";

export default class UserService {

    getAll = async () => {
        let users = await usersModel.find();
        return users.map(user => user.toObject());
    }

    save = async (userData) => {
        let result = await usersModel.create(userData);
        return result;
    }
}