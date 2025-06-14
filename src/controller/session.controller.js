import userModel from "../models/user.model.js";
import { generateToken, isValidPassword } from '../utils.js';

export const registerUser = async (req, res) => {
    const { first_name, last_name, email, age, role, password } = req.body;

    // Validar que el email y la contraseña no estén vacíos
    if (!first_name || !last_name || !email || !age || !password) {
        return res.status(400).send({ message: 'Faltan información, favor de llenar todos los campos' });
    };

    // Verificar si el usuario ya existe
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(400).send({ message: 'El usuario ya existe' });
    };

    // Crear un nuevo usuario
    const newUser = {
        first_name,
        last_name,
        email,
        age,
        role,
        password
    };

    await userModel.create(newUser);
    res.status(201).send({ message: 'Usuario creado' });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    // Validar que el email y la contraseña no estén vacíos
    if (!email || !password) {
        return res.status(400).send({ message: 'Email y contraseña son requeridos' });
    };

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(401).send("Usuario no encontrado");
    };

    // Verificar la contraseña
    if (!isValidPassword(user, password)) {
        return res.status(403).send("Contraseña incorrecta");
    };

    // Si el usuario es encontrado y la contraseña es correcta, firmar el token
    const token = generateToken({ email: user.email, role: user.role });
    res.cookie('tokenCookie', token, { maxAge: 3600000, httpOnly: true }).send({ message: 'Login exitoso' });
};

export const logout = (req, res) => {
    res.clearCookie('tokenCookie').send({ message: 'Logout exitoso' });
};
