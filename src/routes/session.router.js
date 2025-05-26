import Router from '../routes/classRouter/class.router.js';
import { registerUser, login, logout } from '../controller/session.controller.js';
import { passportCall} from '../utils.js';

export default class SessionRouter extends Router {

    init() {

        this.post('/register', ["user", "admin"], registerUser);
        this.post('/login', ["user", "admin"], login);
        this.post('/logout', ["user", "admin"], logout);
        this.get('/current', ["user", "admin"], passportCall('current'), (req, res) => {
            res.send({ status: 'success', payload: req.user });
        });

    }

}