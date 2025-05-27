import mongoose from "mongoose";

const collection = "orders";

const orderSchema = new mongoose.Schema({

    orderNumber: Number, //Número de orden
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: String //Campo que nos sirve para cancelar o completar una orden
});

const orderModel = mongoose.model(collection, orderSchema);

export default orderModel;