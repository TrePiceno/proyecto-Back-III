import userModel from "../models/user.model.js";

export default class User {

    getUsers = async () => {
        try {
            let allUsers = await userModel.find();
            return allUsers;
        }
        catch (error) {
            console.error(error);
            throw error
        }
    }

    getUserById = async (id) => {
        try {
            let user = await userModel.findOne({ _id: id });
            return user;
        }
        catch (error) {
            console.error(error);
            throw error
        }
    }

    saveUser = async (user) => {
        try {
            let userCreated = await userModel.create(user);
            return userCreated;
        }
        catch (error) {
            console.error(error);
            throw error
        }
    }

    updateUser = async (id, user) => {
        try {
            let userUpdated = await userModel.updateOne({ _id: id }, { $set: user });
            return userUpdated;
        }
        catch (error) {
            console.error(error);
            throw error
        }
    }

    deleteUser = async (id) => {
        try {
            let userdeleted = await userModel.deleteOne({ _id: id });
            return userdeleted;
        }
        catch (error) {
            console.error(error);
            throw error
        }
    }
}