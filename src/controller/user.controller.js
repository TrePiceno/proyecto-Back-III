import UserRepository from "../repositories/user.repository.js";

const userService = new UserRepository();

export const saveUser = async (req, res) => {
    const user = req.body;
    try {
        let result = await userService.saveUser(user);

        if (!result) {
            return res.status(404).send({ status: "error", message: "Error al crear usuario" });
        }

        res.send({ status: "success", result });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error interno del servidor" });
    }
};

export const getUsers = async (req, res) => {
    try {
        let result = await userService.getUsers();

        if (!result) {
            return res.status(404).send({ status: "error", message: "Usuarios no encontrados" });
        }

        res.send({ status: "success", result });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error interno del servidor" });
    }
};

export const getUserById = async (req, res) => {
    const { uid } = req.params;
    try {
        let result = await userService.getUserById(uid);

        if (!result) {
            return res.status(404).send({ status: "error", message: "Usuario no encontrado" });
        }
        res.send({ status: "success", result });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error interno del servidor" });
    }
};

export const updateUser = async (req, res) => {
    const { uid } = req.params;
    const user = req.body;
    try {
        let result = await userService.updateUser(uid, user);

        if (!result) {
            return res.status(404).send({ status: "error", message: "Error al actualizar usuario" });
        }

        res.send({ status: "success", result });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error interno del servidor" });
    }
};

export const deleteUser = async (req, res) => {
    const { uid } = req.params;
    try {
        let result = await userService.deleteUser(uid);

        if (!result) {
            return res.status(404).send({ status: "error", message: "Error al eliminar usuario" });
        }

        res.send({ status: "success", result });
    } catch (error) {

        res.status(500).send({ status: "error", message: "Error interno del servidor" });
    }

}