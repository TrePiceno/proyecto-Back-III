import mongoose from 'mongoose';
import { createHash } from '../utils.js';

const userCollection = 'users';


const userSchema = mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    role: { type: String, required: true, default: 'user' },
    password: { type: String, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" }
})

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    this.password = createHash(this.password);
    next();
})

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;