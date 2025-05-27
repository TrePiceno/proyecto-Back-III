import orderRepository from "../repositories/order.repository.js";
import userRepository from "../repositories/user.repository.js";
import cartRepository from "../repositories/cart.repository.js";

const orderService = new orderRepository();
const userService = new userRepository();
const cartService = new cartRepository();

export const createOrder = async (req, res) => {

    try {
        const { cartID, userID } = req.body;
        let orderNumber = Date.now() + Math.floor(Math.random() * 10000 + 1);
        const cart = await cartService.getCartById(cartID);
        const user = await userService.getUserById(userID);
        const totalPrice = cart.products.reduce((sumaTotal, item) => {
            return sumaTotal + (item.quantity * item.product.price);
        }, 0);
    
        let order = {
            orderNumber,
            cart,
            user,
            totalPrice,
            status: "PENDIENTE"
        };
    
        let resultOrder = await orderService.createOrder(order);
        user.cart = cart
        await userService.updateUser(userID, user);
        res.send({ status: "success", result: resultOrder })
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
};

export const getOrders = async (req, res) => {
    let result = await orderService.getOrders();
    res.send({ status: "success", result })
}

export const getOrderById = async (req, res) => {
    const { oid } = req.params;
    try {
        const result = await orderService.getOrderById(oid);
        if (!result) {
            return res.status(404).send({ status: "error", error: "Pedido no encontrado" });
        }
        res.send({ status: "success", result });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }

};