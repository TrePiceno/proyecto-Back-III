import { getUsers, getUserById, saveUser, updateUser, deleteUser } from '../controller/user.controller.js';
import Router from './classRouter/class.router.js';

export default class userRouter extends Router {

    init() {

        this.post('/', ["user", "admin"], saveUser);

        this.get('/', ["user", "admin"], getUsers);

        this.get('/:uid', ["user", "admin"], getUserById);

        this.put('/:uid', ["user", "admin"], updateUser);

        this.delete('/:uid', ["admin"], deleteUser);
    }

}