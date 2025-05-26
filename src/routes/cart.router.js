import Router from '../routes/classRouter/class.router.js';
import { getCartById, createCart, deleteCart, addProductToCart, deleteProductFromCart, getCarts } from '../controller/cart.controller.js';


export default class cartRouter extends Router {
    init() {

        this.get('/', ["user", "admin"], getCarts);

        this.get('/:cid', ["user", "admin"], getCartById);

        this.post('/', ["admin", "user"], createCart);

        this.delete('/:cid', ["admin", "user"], deleteCart);

        this.post('/:cid/product/:pid', ["user", "admin"], addProductToCart);

        this.delete('/:cid/product/:pid', ["admin", "user"], deleteProductFromCart);

    }
}
