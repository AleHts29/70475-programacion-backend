export default class StudentsRepository {
    #dao

    constructor(dao) {
        this.#dao = dao;
    }

    getAll = () => {
        // Podemos tener mas logica
        return this.#dao.getAll();
    }
    save = (student) => {
        return this.#dao.save(student);
    }
    update = (id, student) => {
        return this.#dao.update(id, student);
    }
    findByUsername = async (username) => {
        return this.#dao.findByUsername(username);
    };
}