import orderDao from "../dao/order.dao.js";
import OrderDTO from "../dao/dto/order.dto.js";

export default class orderRepository {

    constructor() {
        this.dao = new orderDao();
    };

    createOrder = async (order) => {
        const ordertoCreate = new OrderDTO(order);
        const newOrder = await this.dao.createOrder(ordertoCreate);
        return newOrder;
    };

    getOrders = async() => {
        const order = await this.dao.getOrders();
        return order;
    };

    getOrderById = async (id) => {
        const order = await this.dao.getOrderById(id);
        return order;
    };

};