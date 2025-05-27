import orderModel from '../models/order.model.js';

export default class Order {

    createOrder = async (order) => {
        try {
            let createdOrder = await orderModel.create(order);
            return createdOrder

        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    getOrders = async () => {
        try {
            return await orderModel.find().populate("user").populate("cart");
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    getOrderById = async (id) => {
        try {
            return await orderModel.findById(id).populate("cart").populate("user");
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
};