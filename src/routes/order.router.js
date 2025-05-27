import Router from '../routes/classRouter/class.router.js';
import { getOrderById, createOrder, getOrders } from '../controller/order.controller.js';

export default class orderRouter extends Router {

    init() {

        this.post('/', ["user", "admin"], createOrder);
        
        this.get('/', ["admin"], getOrders);
        
        this.get('/:oid', ["admin"], getOrderById);
        
    };
}