export default class OrderDTO {

    constructor(order) {

        this.orderNumber = order.orderNumber;

        this.cart = order.cart;

        this.user = order.user;

        this.totalPrice = order.totalPrice;

        this.createdAt = order.createdAt;

        this.status = order.status;
    };
};