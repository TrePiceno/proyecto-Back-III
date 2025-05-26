import userModel from "../models/user.model.js";

export default class User {

    getUsers = async () => {
        try {
            let allUsers = await userModel.find();
            return allUsers;
        }
        catch (error) {
            console.log(error);
            throw error
        }
    }

    getUserById = async (id) => {
        try {
            let user = await userModel.findOne({ _id: id });
            return user;
        }
        catch (error) {
            console.log(error);
            throw error
        }
    }

    saveUser = async (user) => {
        try {
            let userCreated = await userModel.create(user);
            return userCreated;
        }
        catch (error) {
            console.log(error);
            throw error
        }
    }

    updateUser = async (id, user) => {
        try {
            let userUpdated = await userModel.updateOne({ _id: id }, { $set: user });
            return userUpdated;
        }
        catch (error) {
            console.log(error);
            throw error
        }
    }

    deleteUser = async (id) => {
        try {
            let userdeleted = await userModel.deleteOne({ _id: id });
            return userdeleted;
        }
        catch (error) {
            console.log(error);
            throw error
        }
    }
}